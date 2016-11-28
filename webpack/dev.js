const join = require('path').join;
const config = require('./common');

const rootDir = join(__dirname, '../');

const devConfig = {
  devtool: 'eval',
  devServer: {
    contentBase: join(rootDir, 'static'),
    host: '0.0.0.0',
    port: 8000,
  },
};

module.exports = Object.assign(devConfig, config);
