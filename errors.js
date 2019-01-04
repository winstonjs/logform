/* eslint no-undefined: 0 */
'use strict';

const format = require('./format');
const { MESSAGE } = require('triple-beam');

/*
 * function errors (info)
 * If the `message` property of the `info` object is an instance of `Error`,
 * replace the `Error` object its own `message` property.
 *
 * Optionally, the Error's `stack` property can also be appended to the `info` object.
 */
module.exports = format((info, { stack }) => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      message: info.message,
      [MESSAGE]: info.message,
      stack: stack ? info.stack : undefined
    });
  }

  console.dir(info.message);
  console.dir(info.stack);
  console.dir(info instanceof Error);
  if (!(info.message instanceof Error)) return info;

  console.dir('wtf');
  const err = info.message;

  info.message = err.message;
  info[MESSAGE] = err.message;

  if (opts.stack) info.stack = err.stack;

  return info;
});
