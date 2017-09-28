'use strict';

const format = require('./format');

/*
 * function json (opts)
 * Returns a new instance of the JSON format that turns a log `info`
 * object into pure JSON. This was previously exposed as { json: true }
 * to transports in `winston < 3.0.0`.
 */
module.exports = format(function (info, opts) {
  //
  // TODO: Are we causing unexpected side effects by not deep
  // cloning the info object here?
  //
  info.raw = JSON.stringify(info, opts.replacer || replacer, opts.space);
  return info;
});

/*
 * function replacer (key, value)
 * Handles proper stringification of Buffer output.
 */
function replacer(key, value) {
  return value instanceof Buffer
    ? value.toString('base64')
    : value;
}
