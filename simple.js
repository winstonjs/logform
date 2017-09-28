'use strict';

const format = require('./format');

/*
 * function simple (opts)
 * Returns a new instance of the simple format TransformStream
 * which writes a simple representation of logs.
 *
 *    const { level, message, ...rest } = info;
 *    ${level}: ${message} ${JSON.stringify(rest)}
 */
module.exports = format(function (info, opts) {
  info.raw = info.level + ': ' + info.message + JSON.stringify(
    Object.assign({}, info, { level: undefined, message: undefined })
  );

  return info;
});
