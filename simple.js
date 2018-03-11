/* eslint no-undefined: 0 */
'use strict';

const format = require('./format');
const MESSAGE = Symbol.for('message');

/*
 * function simple (info)
 * Returns a new instance of the simple format TransformStream
 * which writes a simple representation of logs.
 *
 *    const { level, message, splat, ...rest } = info;
 *
 *    ${level}: ${message}                            if rest is empty
 *    ${level}: ${message} ${JSON.stringify(rest)}    otherwise
 */
module.exports = format(function (info) {
  const stringifiedRest = JSON.stringify(Object.assign({}, info, {
    level: undefined,
    message: undefined,
    splat: undefined
  }));

  if (stringifiedRest !== '{}') {
    info[MESSAGE] = `${info.level}: ${info.message} ${stringifiedRest}`;
  } else {
    info[MESSAGE] = `${info.level}: ${info.message}`;
  }

  return info;
});
