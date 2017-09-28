'use strict';

const format = require('./format');
const util = require('util');

/*
 * function splat (opts)
 * Returns a new instance of the splat format TransformStream
 * which performs string interpolation from `info` objects. This was
 * previously exposed implicitly in `winston < 3.0.0`.
 */
module.exports = format(function (info, opts) {
  if (info.splat) {
    info.message = util.format(info.message, ...info.splat);
  }

  return info;
});
