'use strict';

const format = require('./format');
const formatDate = require('date-fns/format');

/*
 * function timestamp (opts)
 * Returns a new instance of the timestamp Format which adds a timestamp
 * to the info. It was previously available in winston < 3.0.0 as:
 *
 * - { timestamp: true }             // `new Date.toISOString()`
 * - { timestamp: function:String }  // Value returned by `timestamp()`
 */
module.exports = format(function (info, opts) {
  if (opts.format) {
    info.timestamp = typeof opts.format === 'function'
      ? opts.format()
      : formatDate(opts.format);
  }

  if (!info.timestamp) {
    info.timestamp = new Date.toISOString();
  }

  return info;
});
