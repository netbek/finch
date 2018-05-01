const path = require('path');
const {browserslist} = require('./package.json');
const rootPath = path.resolve(__dirname) + '/';

module.exports = {
  autoprefixer: {
    browsers: browserslist
  },
  css: {
    params: {
      includePaths: ['src/docs/css'],
      errLogToConsole: true
    }
  },
  docs: {
    src: rootPath + 'src/docs/',
    dist: rootPath + 'docs/'
  },
  finch: {
    src: rootPath + 'src/finch/',
    dist: rootPath + 'finch/'
  },
  webserver: {
    host: 'localhost',
    port: 8000,
    path: '/',
    livereload: false,
    directoryListing: false,
    open: '/docs/',
    https: false,
    fallback: 'docs/index.html', // For SPAs that manipulate browser history
    browsers: {
      default: 'firefox',
      darwin: 'google chrome',
      linux: 'google-chrome',
      win32: 'chrome'
    }
  }
};
