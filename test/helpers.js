const stream = require('stream');
const fixtures = require('./fixtures');

/**
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

/**
 * Simple test helper which creates an instance
 * of the `colorize` format and asserts that the
 * correct `info` object was processed.
 */
exports.assumeFormatted = function (format, info, assertion) {
  return function (done) {
    var writeable = exports.writeable(function (info) {
      assertion(info);
      done();
    });

    writeable.write(format.transform(info, format.options));
  };
}
