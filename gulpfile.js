const _ = require('lodash');
const autoprefixer = require('autoprefixer');
const fs = require('fs-extra');
const glob = require('glob-promise');
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
const Prism = require('node-prismjs');
const Promise = require('bluebird');
const runSequence = require('run-sequence');
const webpack = require('webpack');
const webserver = require('gulp-webserver');

Promise.promisifyAll(fs);

/* -----------------------------------------------------------------------------
 * Config
 ---------------------------------------------------------------------------- */

const {name: packageName} = require('./package');
const globalName = 'finch';

const rootPath = path.resolve(__dirname) + '/';

const gulpConfig = require('./gulp.config');

const webpackConfigDev = require('./webpack.config.dev');
const webpackConfigProd = require('./webpack.config.prod');

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

function buildJs(config) {
  return new Promise((resolve, reject) => {
    webpack(config, function(err, stats) {
      if (err) {
        log('[webpack]', err);
        reject();
      } else {
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
        resolve();
      }
    });
  });
}

function buildJsExample(src, dest) {
  return fs.readFileAsync(src, 'utf8').then(data => {
    const code = data
      .replace('\r\n', '\n')
      .replace('\r', '\n')
      .split('\n')
      .filter(d => !(d.startsWith('import') || d.startsWith('export')))
      .join('\n')
      .trim();

    const html = `<pre><code>${Prism.highlight(
      code,
      Prism.languages.javascript
    )}</code></pre>`;

    return fs.outputFileAsync(dest, html, 'utf8');
  });
}

function buildModuleClean(build) {
  return fs.emptyDirAsync(gulpConfig.module.dist.umd);
}

/**
 *
 * @param   {string}   build
 * @returns {Promise}
 */
function buildModuleJs(build) {
  const configs = [
    {
      ...webpackConfigProd,
      entry: {
        [globalName]: path.join(gulpConfig.module.src, 'js/index.js'),
        [globalName + '.min']: path.join(gulpConfig.module.src, 'js/index.js')
      },
      output: {
        filename: '[name].js',
        path: path.join(gulpConfig.module.dist.umd),
        library: globalName,
        libraryExport: 'default',
        libraryTarget: 'umd'
      }
    }
  ];

  const outputPaths = configs.reduce(
    (result, config) =>
      [].concat(
        result,
        _.keys(config.entry).map(entry => ({
          src: path.join(config.output.path, `${entry}.js`),
          dest: path.join(
            gulpConfig.docs.dist[build],
            'vendor',
            packageName,
            gulpConfig.module.dist.umd.replace(rootPath, ''),
            `${entry}.js`
          )
        }))
      ),
    []
  );

  return Promise.mapSeries(configs, config => buildJs(config)).then(() =>
    Promise.mapSeries(outputPaths, ({src, dest}) => fs.copyAsync(src, dest))
  );
}

function buildDocsClean(build) {
  return fs.emptyDirAsync(gulpConfig.docs.dist[build]);
}

function buildDocsCss(build) {
  return buildCss(
    path.join(gulpConfig.docs.src, 'css/**/*.scss'),
    path.join(gulpConfig.docs.dist[build], 'css'),
    'docs.css'
  );
}

function buildDocsData(build) {
  const src = path.join(gulpConfig.docs.src, 'data');
  const dest = path.join(gulpConfig.docs.dist[build], 'data');

  return fs.removeAsync(dest).then(() => fs.copyAsync(src, dest));
}

function buildDocsJsExamples(build) {
  // Find old examples
  return glob(path.join(gulpConfig.docs.src, 'js/plots/*.html'))
    .then(files =>
      // Remove old examples
      Promise.mapSeries(files, file => fs.removeAsync(file))
    )
    .then(() =>
      // Build examples from all JS files except index file
      glob(path.join(gulpConfig.docs.src, 'js/plots/!(index).js')).then(files =>
        Promise.mapSeries(files, file =>
          buildJsExample(
            file,
            path.join(
              gulpConfig.docs.src,
              'js/plots',
              path.basename(file) + '.html'
            )
          )
        )
      )
    );
}

/**
 *
 * @param   {string}   build
 * @returns {Promise}
 */
function buildDocsJs(build) {
  const config = build === DEV ? webpackConfigDev : webpackConfigProd;

  return buildDocsJsExamples(build).then(() =>
    buildJs({
      ...config,
      entry: {
        docs: path.join(gulpConfig.docs.src, 'js/index.jsx'),
        'docs.min': path.join(gulpConfig.docs.src, 'js/index.jsx')
      },
      output: {
        filename: '[name].js',
        path: path.join(gulpConfig.docs.dist[build], 'js')
      }
    })
  );
}

function buildDocsHtml(build, cb) {
  gulp
    .src([
      path.join(
        gulpConfig.docs.src,
        build === DEV ? '*.dev.html' : '*.prod.html'
      )
    ])
    .pipe(
      gulpRename(file => {
        if (file.basename.endsWith(build === DEV ? '.dev' : '.prod')) {
          file.basename = file.basename.slice(0, build === DEV ? -4 : -5);
        }
      })
    )
    .pipe(gulp.dest(gulpConfig.docs.dist[build]))
    .on('end', cb);
}

function buildDocsVendor(build) {
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
    .removeAsync(path.join(gulpConfig.docs.dist[build], 'vendor'))
    .then(() =>
      Promise.mapSeries(modulePaths, modulePath => {
        const moduleName = modulePath.split('/')[0];
        const subdir = modulePath
          .split('/')
          .slice(1)
          .join('/');

        return pkgDir(require.resolve(moduleName)).then(resolvedPath => {
          const src = path.join(resolvedPath, subdir);
          const dest = path.join(
            gulpConfig.docs.dist[build],
            'vendor',
            modulePath
          );

          return fs.copyAsync(src, dest);
        });
      })
    )
    .then(() =>
      Promise.mapSeries(staticPaths, dir => {
        const src = path.join(gulpConfig.docs.src, 'vendor', dir);
        const dest = path.join(gulpConfig.docs.dist[build], 'vendor', dir);

        return fs.copyAsync(src, dest);
      })
    );
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

gulp.task('build', function(cb) {
  runSequence('build-docs:prod', 'build-module:prod', cb);
});

gulp.task('build-module:dev', function(cb) {
  runSequence('build-module-clean:dev', 'build-module-js:dev', cb);
});

gulp.task('build-module:prod', function(cb) {
  runSequence('build-module-clean:prod', 'build-module-js:prod', cb);
});

gulp.task('build-module-clean:dev', function() {
  return buildModuleClean(DEV);
});

gulp.task('build-module-clean:prod', function() {
  return buildModuleClean(PROD);
});

gulp.task('build-module-js:dev', function() {
  return buildModuleJs(DEV);
});

gulp.task('build-module-js:prod', function() {
  return buildModuleJs(PROD);
});

gulp.task('build-docs:dev', function(cb) {
  runSequence(
    'build-docs-clean:dev',
    'build-docs-vendor:dev',
    'build-docs-css:dev',
    'build-docs-data:dev',
    'build-docs-html:dev',
    'build-docs-js:dev',
    cb
  );
});

gulp.task('build-docs:prod', function(cb) {
  runSequence(
    'build-docs-clean:prod',
    'build-docs-vendor:prod',
    'build-docs-css:prod',
    'build-docs-data:prod',
    'build-docs-html:prod',
    'build-docs-js:prod',
    cb
  );
});

gulp.task('build-docs-clean:dev', function() {
  return buildDocsClean(DEV);
});

gulp.task('build-docs-clean:prod', function() {
  return buildDocsClean(PROD);
});

gulp.task('build-docs-data:dev', function() {
  return buildDocsData(DEV);
});

gulp.task('build-docs-data:prod', function() {
  return buildDocsData(PROD);
});

gulp.task('build-docs-html:dev', function(cb) {
  buildDocsHtml(DEV, cb);
});

gulp.task('build-docs-html:prod', function(cb) {
  buildDocsHtml(PROD, cb);
});

gulp.task('build-docs-css:dev', function() {
  return buildDocsCss(DEV);
});

gulp.task('build-docs-css:prod', function() {
  return buildDocsCss(PROD);
});

gulp.task('build-docs-js:dev', function() {
  return buildDocsJs(DEV);
});

gulp.task('build-docs-js:prod', function() {
  return buildDocsJs(PROD);
});

gulp.task('build-docs-vendor:dev', function() {
  return buildDocsVendor(DEV);
});

gulp.task('build-docs-vendor:prod', function() {
  return buildDocsVendor(PROD);
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
      tasks: ['build-docs-css:dev']
    },
    {
      files: [path.join(gulpConfig.docs.src, 'data/**/*')],
      tasks: ['build-docs-data:dev']
    },
    {
      files: [
        path.join(gulpConfig.docs.src, 'js/**/*.js'),
        path.join(gulpConfig.docs.src, 'js/**/*.jsx'),
        path.join(gulpConfig.module.src, 'js/**/*.js')
      ],
      tasks: ['build-docs-js:dev', 'build-module-js:dev']
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
    'build-module:dev',
    'webserver-init',
    'livereload-init',
    'watch:livereload'
  );
});

/* -----------------------------------------------------------------------------
 * Default task
 ---------------------------------------------------------------------------- */

gulp.task('default', ['build']);
