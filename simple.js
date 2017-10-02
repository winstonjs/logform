/* eslint no-undefined: 0 */
'use strict';

const format = require('./format');
const MESSAGE = Symbol.for('message');

/*
 * function simple (info)
 * Returns a new instance of the simple format TransformStream
 * which writes a simple representation of logs.
 *
 *    const { level, message, ...rest } = info;
 *    ${level}: ${message} ${JSON.stringify(rest)}
 */
module.exports = format(function (info) {
  info[MESSAGE] = info.level + ': ' + info.message + ' ' + JSON.stringify(
    Object.assign({}, info, {
      level: undefined,
      message: undefined,
      splat: undefined
    })
  );

  return info;
});
