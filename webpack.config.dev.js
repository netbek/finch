const _ = require('lodash');
const webpack = require('webpack');
const webpackConfigBase = require('./webpack.config.base');

module.exports = _.merge({}, webpackConfigBase, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
