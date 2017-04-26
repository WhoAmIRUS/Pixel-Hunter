const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./common');

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      booleans: false,
      unused: false,
    },
  }),
  new webpack.optimize.DedupePlugin(),
];
const prodConfig = {
  devtool: 'source-map',
  module: Object.assign(
    config.module,
    {
      loaders: config.module.loaders.concat([
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?-url'),
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css?-url!postcss'),
        },
      ]),
    }
  ),
  plugins: prodPlugins.concat(config.plugins),
};

module.exports = Object.assign(config, prodConfig);
