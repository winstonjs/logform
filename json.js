'use strict';

const format = require('./format');
const { MESSAGE } = require('triple-beam');

/*
 * function replacer (key, value)
 * Handles proper stringification of Buffer output.
 */
function replacer(key, value) {
  return value instanceof Buffer
    ? value.toString('base64')
    : value;
}

/*
 * function json (info)
 * Returns a new instance of the JSON format that turns a log `info`
 * object into pure JSON. This was previously exposed as { json: true }
 * to transports in `winston < 3.0.0`.
 */
module.exports = format((info, opts = { replacer, space: 0 }) => {
  info[MESSAGE] = JSON.stringify(info, opts.replacer, opts.space);
  return info;
});
