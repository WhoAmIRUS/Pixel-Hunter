/* eslint-disable no-console */
const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_VERSION = process.versions.node.split('.')[0];
const SILENT_BUILD = process.env.SILENT_BUILD || NODE_ENV !== 'development';
const CONFIG_FILE_NAME = NODE_ENV === 'development' ? 'dev.js' : 'prod.js';

const os = require('os');

function smartConsoleLog(msgArg, isError) {
  if (SILENT_BUILD) return;
  const msg = msgArg || os.EOL;
  const method = isError ? 'error' : 'log';
  console[method](msg);
}

if (NODE_VERSION < 4) {
  smartConsoleLog('ERROR: This tool requires Node.js v4 or higher.', true);
  process.exit(1);
}

smartConsoleLog();
smartConsoleLog(`Building env: "${NODE_ENV.toUpperCase()}"`);
smartConsoleLog();

module.exports = require(`./${CONFIG_FILE_NAME}`);
