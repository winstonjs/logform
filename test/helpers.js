'use strict';

const stream = require('stream');
const assume = require('assume');
const format = require('../format');
const levels = require('../levels');
const { configs } = require('triple-beam');

exports.setupLevels = () => {
  levels(configs.cli);
  levels(configs.npm);
  levels(configs.syslog);
};

/*
 * Returns a new writeable stream with the specified write function.
 * @param {function} write Write function for the specified stream
 * @returns {stream.Writeable} A writeable stream instance
 */
exports.writeable = write => (
  new stream.Writable({
    write,
    objectMode: true
  })
);

/*
 * Simple test helper which creates an instance
 * of the `colorize` format and asserts that the
 * correct `info` object was processed.
 */
exports.assumeFormatted = (fmt, info, assertion) => {
  return done => {
    const writeable = exports.writeable(actual => {
      assertion(actual, info);
      done();
    });

    writeable.write(fmt.transform(Object.assign({}, info), fmt.options));
  };
};

/*
 * Assumes that the Factory prototype is exposed on every
 * instance of the format, `fmt`, as `fmt.Format`.
 */
exports.assumeHasPrototype = fmt => {
  return () => {
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

  assign(info, opts) {
    return Object.assign({}, info, opts);
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
