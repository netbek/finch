const _ = require('lodash');
const autoprefixer = require('autoprefixer');
const fs = require('fs-extra');
const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpCssmin = require('gulp-cssmin');
const gulpPostcss = require('gulp-postcss');
const gulpRename = require('gulp-rename');
const gulpSass = require('gulp-sass');
const livereload = require('livereload');
const log = require('fancy-log');
const open = require('open');
const os = require('os');
const path = require('path');
const pkgDir = require('pkg-dir');
const Promise = require('bluebird');
const runSequence = require('run-sequence');
const webpack = require('webpack');
const webserver = require('gulp-webserver');

Promise.promisifyAll(fs);

/* -----------------------------------------------------------------------------
 * Config
 ---------------------------------------------------------------------------- */

const gulpConfig = require('./gulp.config');

const webpackConfig = require('./webpack.config');

const livereloadOpen =
  (gulpConfig.webserver.https ? 'https' : 'http') +
  '://' +
  gulpConfig.webserver.host +
  ':' +
  gulpConfig.webserver.port +
  (gulpConfig.webserver.open ? gulpConfig.webserver.open : '/');

/* -----------------------------------------------------------------------------
 * Misc
 ---------------------------------------------------------------------------- */

const DEV = 'dev';
const PROD = 'prod';

const flags = {
  livereloadInit: false // Whether `livereload-init` task has been run
};
let server;

// Choose browser for node-open.
let browser = gulpConfig.webserver.browsers.default;
const platform = os.platform();
if (_.has(gulpConfig.webserver.browsers, platform)) {
  browser = gulpConfig.webserver.browsers[platform];
}

/* -----------------------------------------------------------------------------
 * Functions
 ---------------------------------------------------------------------------- */

/**
 *
 * @param   {string} src
 * @param   {string} dist
 * @param   {string} distName
 * @returns {Promise}
 */
function buildCss(src, dist, distName = 'app.css') {
  return new Promise(function(resolve, reject) {
    gulp
      .src(src)
      .pipe(gulpSass(gulpConfig.css.params).on('error', gulpSass.logError))
      .pipe(gulpPostcss([autoprefixer(gulpConfig.autoprefixer)]))
      .pipe(gulpConcat(distName))
      .pipe(gulp.dest(dist))
      .pipe(
        gulpCssmin({
          advanced: false
        })
      )
      .pipe(
        gulpRename({
          suffix: '.min'
        })
      )
      .pipe(gulp.dest(dist))
      .on('end', function() {
        resolve();
      });
  });
}

/**
 *
 * @param   {string}   build
 * @param   {Function} cb
 */
function buildJs(build, cb) {
  const config = {
    ...webpackConfig,
    entry: {docs: path.join(gulpConfig.docs.src, 'js/index.jsx')},
    output: {
      filename: build === DEV ? '[name].js' : '[name].min.js',
      path: path.join(gulpConfig.docs.dist, 'js')
    }
  };

  webpack(config, function(err, stats) {
    if (err) {
      log('[webpack]', err);
    }

    log(
      '[webpack]',
      stats.toString({
        cached: false,
        cachedAssets: false,
        children: true,
        chunks: false,
        chunkModules: false,
        chunkOrigins: true,
        colors: true,
        entrypoints: false,
        errorDetails: false,
        hash: false,
        modules: false,
        performance: true,
        reasons: true,
        source: false,
        timings: true,
        version: true,
        warnings: true
      })
    );

    cb();
  });
}

/**
 * Start a watcher.
 *
 * @param {Array} files
 * @param {Array} tasks
 * @param {boolean} livereload - Set to `true` to force livereload to refresh the page.
 */
function startWatch(files, tasks, livereload) {
  if (livereload) {
    tasks.push('livereload-reload');
  }

  gulp.watch(files, function() {
    runSequence(...tasks);
  });
}

/* -----------------------------------------------------------------------------
 * Tasks
 ---------------------------------------------------------------------------- */

gulp.task('build-docs:dev', function(cb) {
  runSequence(
    'build-docs-clean',
    'build-docs-vendor',
    'build-docs-css',
    'build-docs-data',
    'build-docs-html:dev',
    'build-docs-js:dev',
    cb
  );
});

gulp.task('build-docs:prod', function(cb) {
  runSequence(
    'build-docs-clean',
    'build-docs-vendor',
    'build-docs-css',
    'build-docs-data',
    'build-docs-html:prod',
    'build-docs-js:prod',
    cb
  );
});

gulp.task('build-docs-clean', function() {
  return fs.emptyDirAsync('./docs');
});

gulp.task('build-docs-data', function() {
  const src = path.join(gulpConfig.docs.src, 'data');
  const dest = path.join(gulpConfig.docs.dist, 'data');

  return fs.removeAsync(dest).then(() => fs.copyAsync(src, dest));
});

gulp.task('build-docs-html:dev', function(cb) {
  gulp
    .src([path.join(gulpConfig.docs.src, '*.dev.html')])
    .pipe(
      gulpRename(file => {
        if (file.basename.endsWith('.dev')) {
          file.basename = file.basename.slice(0, -4);
        }
      })
    )
    .pipe(gulp.dest(gulpConfig.docs.dist))
    .on('end', cb);
});

gulp.task('build-docs-html:prod', function(cb) {
  gulp
    .src([path.join(gulpConfig.docs.src, '*.prod.html')])
    .pipe(
      gulpRename(file => {
        if (file.basename.endsWith('.prod')) {
          file.basename = file.basename.slice(0, -5);
        }
      })
    )
    .pipe(gulp.dest(gulpConfig.docs.dist))
    .on('end', cb);
});

gulp.task('build-docs-css', function() {
  return buildCss(
    path.join(gulpConfig.docs.src, 'css/**/*.scss'),
    path.join(gulpConfig.docs.dist, 'css'),
    'docs.css'
  );
});

gulp.task('build-docs-js:dev', function(cb) {
  buildJs(DEV, cb);
});

gulp.task('build-docs-js:prod', function(cb) {
  buildJs(PROD, cb);
});

gulp.task('build-docs-vendor', function() {
  // Files stored in `node_modules`
  const modulePaths = [
    'lodash/lodash.min.js',
    'prism-themes/themes',
    'react/umd',
    'react-dom/umd',
    'vega/build',
    'vega-embed/build',
    'vega-lite/build'
  ];

  // Files stored in `src/docs/vendor`
  const staticPaths = ['tufte-css/et-book', 'tufte-css/tufte.css'];

  return fs
    .removeAsync(path.join(gulpConfig.docs.dist, 'vendor'))
    .then(() =>
      Promise.mapSeries(modulePaths, modulePath => {
        const moduleName = modulePath.split('/')[0];
        const subdir = modulePath
          .split('/')
          .slice(1)
          .join('/');

        return pkgDir(require.resolve(moduleName)).then(resolvedPath => {
          const src = path.join(resolvedPath, subdir);
          const dest = path.join(gulpConfig.docs.dist, 'vendor', modulePath);

          return fs.copyAsync(src, dest);
        });
      })
    )
    .then(() =>
      Promise.mapSeries(staticPaths, dir => {
        const src = path.join(gulpConfig.docs.src, 'vendor', dir);
        const dest = path.join(gulpConfig.docs.dist, 'vendor', dir);

        return fs.copyAsync(src, dest);
      })
    );
});

// Start the webserver.
gulp.task('webserver-init', function(cb) {
  const config = {...gulpConfig.webserver, open: false};

  gulp
    .src('./')
    .pipe(webserver(config))
    .on('end', cb);
});

// Start the LiveReload server.
gulp.task('livereload-init', function(cb) {
  if (!flags.livereloadInit) {
    flags.livereloadInit = true;
    server = livereload.createServer();
    open(livereloadOpen, browser);
  }
  cb();
});

// Refresh the page.
gulp.task('livereload-reload', function(cb) {
  server.refresh(livereloadOpen);
  cb();
});

gulp.task('watch:livereload', function() {
  const livereloadTask = 'livereload-reload';
  const watchTasks = [
    {
      files: [path.join(gulpConfig.docs.src, 'css/**/*')],
      tasks: ['build-docs-css']
    },
    {
      files: [path.join(gulpConfig.docs.src, 'data/**/*')],
      tasks: ['build-docs-data']
    },
    {
      files: [
        path.join(gulpConfig.docs.src, 'js/**/*'),
        path.join(gulpConfig.finch.src, 'js/**/*')
      ],
      tasks: ['build-docs-js:dev']
    },
    {
      files: [path.join(gulpConfig.docs.src, '*.html')],
      tasks: ['build-docs-html:dev']
    }
  ];

  _.forEach(watchTasks, function(watchConfig) {
    const tasks = _.clone(watchConfig.tasks);
    tasks.push(livereloadTask);
    startWatch(watchConfig.files, tasks);
  });
});

gulp.task('livereload', function() {
  runSequence(
    'build-docs:dev',
    'webserver-init',
    'livereload-init',
    'watch:livereload'
  );
});

/* -----------------------------------------------------------------------------
 * Default task
 ---------------------------------------------------------------------------- */

gulp.task('default', ['build-docs:prod']);
