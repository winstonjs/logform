/* eslint no-unused-vars: 0 */
'use strict';

const format = require('./format');

/*
 * function padLevels (info)
 * Returns a new instance of the padLevels Format which pads
 * levels to be the same length. This was previously exposed as
 * { padLevels: true } to transports in `winston < 3.0.0`.
 */
module.exports = format(function (info, { levels, filler = ' ' }) {
  const lvls = Object.keys(levels).map(level => level.length);
  const longest = Math.max(...lvls);
  const targetLength = Math.floor(longest + 1) - info.level.length;
  let padStr = String(filler);
  padStr += padStr.repeat(targetLength / padStr.length);

  info.padding = padStr.slice(0, targetLength);

  return info;
});
