'use strict';

const inspect = require('util').inspect;
const format = require('./format');
const { LEVEL, MESSAGE, SPLAT } = require('triple-beam');

/*
 * function prettyPrint (info)
 * Returns a new instance of the prettyPrint Format that "prettyPrint"
 * serializes `info` objects. This was previously exposed as
 * { prettyPrint: true } to transports in `winston < 3.0.0`.
 */
module.exports = format((info, opts = {}) => {
  //
  // info[{LEVEL, MESSAGE, SPLAT}] are enumerable here. Since they
  // are internal, we remove them before util.inspect so they
  // are not printed.
  //
  const {
    [LEVEL]: level, // eslint-disable-line no-unused-vars
    [MESSAGE]: message, // eslint-disable-line no-unused-vars
    [SPLAT]: splat, // eslint-disable-line no-unused-vars
    ...stripped
  } = info;

  info[MESSAGE] = inspect(stripped, false, opts.depth || null, opts.colorize);
  return info;
});
