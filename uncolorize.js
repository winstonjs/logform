'use strict';

const colors = require('colors/safe');
const format = require('./format');

/*
 * function uncolorize (opts)
 * Returns a new instance of the uncolorize Format that strips colors
 * from `info` objects. This was previously exposed as { stripColors: true }
 * to transports in `winston < 3.0.0`.
 */
module.exports = format(function (info, opts) {
  info.level = colors.strip(info.level);
  info.message = colors.strip(info.message);

  if (info.raw) {
    info.raw = colors.strip(info.raw);
  }

  return info;
});
