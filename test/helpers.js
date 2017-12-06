'use strict';

const stream = require('stream');
const assume = require('assume');
const format = require('../format');

/*
 * Returns a new writeable stream with the specified write function.
 * @param {function} write Write function for the specified stream
 * @returns {stream.Writeable} A writeable stream instance
 */
exports.writeable = function (write) {
  return new stream.Writable({
    objectMode: true,
    write: write
  });
};

/*
 * Simple test helper which creates an instance
 * of the `colorize` format and asserts that the
 * correct `info` object was processed.
 */
exports.assumeFormatted = function (format, info, assertion) {
  return function (done) {
    var writeable = exports.writeable(function (actual) {
      assertion(actual, info);
      done();
    });

    writeable.write(format.transform(Object.assign({}, info), format.options));
  };
};

/*
 * Assumes that the Factory prototype is exposed on every
 * instance of the format, `fmt`, as `fmt.Format`.
 */
exports.assumeHasPrototype = function (fmt) {
  return function assumeFormat() {
    assume(fmt.Format).is.a('function');
    assume(fmt.Format.prototype.transform).is.a('function');
  };
};

/*
 * Set of simple format functions that illustrate
 * expected, edge, and corner cases.
 */
exports.formatFns = {
  identity(info) {
    return info;
  },

  assign(info) {
    return Object.assign({}, info);
  },

  // eslint-disable-next-line no-unused-vars
  ignore(info) {
    return false;
  },

  // eslint-disable-next-line no-unused-vars
  invalid(just, too, many, args) {
    return just;
  },

  die(info) {
    throw new Error(`die from ${info.message}`);
  }
};

/*
 * Create a set of actual formats based on the formatFns.
 * This is very useful in upstream tests.
 */
exports.formats = Object.keys(exports.formatFns)
  .filter(name => !['invalid'].includes(name))
  .reduce((acc, name) => {
    const formatFn = exports.formatFns[name];
    acc[name] = format(formatFn);

    return acc;
  }, {});
