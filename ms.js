'use strict';

const { performance } = require('perf_hooks');
const format = require('./format');
const ms = require('ms');

/*
 * function ms (info)
 * Returns an `info` with a `ms` property. The `ms` property holds the Value
 * of the time difference between two calls in milliseconds.
 */
module.exports = format((info) => {
  const curr = performance.now();
  this.diff = curr - (this.prevTime || curr);
  this.prevTime = curr;
  info.ms = `+${ms(Math.round(this.diff))}`;

  return info;
});
