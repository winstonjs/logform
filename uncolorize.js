'use strict';

const colors = require('colors/safe');
const format = require('./format');
const { LEVEL, MESSAGE } = require('triple-beam');

/*
 * function uncolorize (info)
 * Returns a new instance of the uncolorize Format that strips colors
 * from `info` objects. This was previously exposed as { stripColors: true }
 * to transports in `winston < 3.0.0`.
 */
module.exports = format((info, opts) => {
  if (opts.level !== false) {
    info.level = colors.strip(info[LEVEL]);
  }

  if (opts.message !== false) {
    info.message = colors.strip(info.message);
  }

  if (opts.raw !== false && info[MESSAGE]) {
    info[MESSAGE] = colors.strip(info[MESSAGE]);
  }

  return info;
});
