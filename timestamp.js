'use strict';

const fecha = require('fecha');
const format = require('./format');

/*
 * function timestamp (info)
 * Returns a new instance of the timestamp Format which adds a timestamp
 * to the info. It was previously available in winston < 3.0.0 as:
 *
 * - { timestamp: true }             // `new Date.toISOString()`
 * - { timestamp: function:String }  // Value returned by `timestamp()`
 */
module.exports = format((info, opts = { propName: 'timestamp' }) => {
  if (opts.format) {
    info[opts.propName] = typeof opts.format === 'function'
      ? opts.format()
      : fecha.format(new Date(), opts.format);
  }

  if (!info[opts.propName]) {
    info[opts.propName] = new Date().toISOString();
  }

  if (opts.alias) {
    info[opts.alias] = info[opts.propName];
  }

  return info;
});
