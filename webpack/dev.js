const join = require('path').join;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./common');

const rootDir = join(__dirname, '../');

const devConfig = {
  devtool: 'eval',
  devServer: {
    contentBase: join(rootDir, 'static'),
    host: '0.0.0.0',
    port: 8000,
  },
  module: Object.assign(
    config.module,
    {
      loaders: config.module.loaders.concat([
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap'),
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss?parser=postcss-scss'),
        },
      ]),
    }
  ),
};

module.exports = Object.assign(config, devConfig);
