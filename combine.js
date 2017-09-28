'use strict';

const format = require('./format');

/*
 * function combine (opts)
 * Returns a new instance of the combine Format which combines the specified
 * formats into a new format. This is similar to a pipe-chain in transform streams.
 * We choose to combine the prototypes this way because there is no back pressure in
 * an in-memory transform chain.
 */
module.exports = function comine(...formats) {
  return format(...formats)();
};
