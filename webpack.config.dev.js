const _ = require('lodash');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackConfigBase = require('./webpack.config.base');

module.exports = _.merge({}, webpackConfigBase, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve(
        process.cwd(),
        'node_modules/.cache/hard-source/[confighash]'
      )
    })
  ]
});
