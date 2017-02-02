var postcssImport = require('postcss-smart-import');
var precss = require('precss');
var short = require('postcss-short');
var hoverFocus = require('postcss-focus');
var cssnext = require('postcss-cssnext');
var lostGrid = require('lost');
var cssMqpacker = require('css-mqpacker');
var csso = require('postcss-csso');
var reporter = require('postcss-browser-reporter');
var stylelint = require('stylelint');

var NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = function(postcss) {
  var postCSSPluginsArray = [
    postcssImport({ addDependencyTo: postcss }),
    precss,
    short,
    hoverFocus,
    cssnext({
      browsers: [
        'last 2 versions',
        'IE >= 11',
      ],
    }),
    lostGrid,
    cssMqpacker,
    csso,
  ];
  if (NODE_ENV !== 'production') {
    postCSSPluginsArray.unshift(stylelint);
    postCSSPluginsArray.push(
      reporter({
        selector: 'body:before',
      })
    );
  }
  return (typeof(postcss) === 'function')
    ? postcss(postCSSPluginsArray)
    : postCSSPluginsArray;
}