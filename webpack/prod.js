const webpack = require('webpack');
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
  plugins: prodPlugins.concat(config.plugins),
};

module.exports = Object.assign(prodConfig, config);
