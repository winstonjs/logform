'use strict';

const Colorizer = require('./colorize').Colorizer;

/*
 * Simple method to register colors with a simpler require
 * path within the module.
 */
module.exports = function (config) {
  Colorizer.addColors(config.colors || config);
  return config;
};
