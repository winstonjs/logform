'use strict';

const assume = require('assume');
const logform = require('../index');
const { formatFns } = require('./helpers');
const { format } = logform;

describe('format', () => {
  it('has the expected default logform.formats', () => {
    assume(logform.format).is.a('function');
    assume(logform.format.align).is.a('function');
    assume(logform.format.cli).is.a('function');
    assume(logform.format.colorize).is.a('function');
    assume(logform.format.combine).is.a('function');
    assume(logform.format.json).is.a('function');
    assume(logform.format.label).is.a('function');
    assume(logform.format.logstash).is.a('function');
    assume(logform.format.padLevels).is.a('function');
    assume(logform.format.prettyPrint).is.a('function');
    assume(logform.format.printf).is.a('function');
    assume(logform.format.splat).is.a('function');
    assume(logform.format.simple).is.a('function');
    assume(logform.format.timestamp).is.a('function');
    assume(logform.format.uncolorize).is.a('function');
  });

  describe('format(fn)', () => {
    it('returns a function', () => {
      const identity = format(formatFns.identity);
      assume(identity).is.a('function');
    });

    it('exposes the Format prototype', () => {
      const identity = format(formatFns.identity);
      assume(identity.Format).is.a('function');
      assume(identity.Format.prototype.transform).is.a('function');
    });

    it('throws if provided a function of invalid length', () => {
      assume(() => {
        format(formatFns.invalid);
      }).throws(/Format functions must be synchronous taking a two arguments/);
    });

    it('throws an error including the bad function signature', () => {
      const fnsig = formatFns.invalid.toString().split('\n')[0];
      try {
        format(formatFns.invalid);
      } catch (ex) {
        assume(ex.message).includes(fnsig);
      }
    });

    it('format(fn)()', () => {
      const identity = format(formatFns.identity);
      const fmt = identity();
      assume(fmt.transform).is.a('function');
      assume(fmt.options).deep.equals({});
    });

    it('format(fn)(opts)', () => {
      const opts = { testing: true };
      const identity = format(formatFns.identity);
      const fmt = identity(opts);
      assume(fmt.transform).is.a('function');
      assume(fmt.options).equals(opts);
    });
  });
});
