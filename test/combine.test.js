'use strict';

const assume = require('assume');
const combine = require('../combine');
const label = require('../label');
const timestamp = require('../timestamp');
const { assumeFormatted, formats } = require('./helpers');

describe('combine', function () {
  describe('combine(...formats)', function () {
    it('returns a function', function () {
      const fmt = combine(
        formats.identity(),
        formats.identity()
      );

      assume(fmt.transform).is.a('function');
      assume(fmt.options).deep.equals({});
    });

    it('exposes the Format prototype', function () {
      const fmt = combine(
        formats.identity(),
        formats.identity()
      );

      assume(fmt.Format).is.a('function');
      assume(fmt.Format.prototype.transform).is.a('function');
    });

    it('throws an error when provided a non-format', function () {
      assume(function () {
        combine(
          function lolwut() {},
          function notaformat() {}
        )
      }).throws();
    });
  });

  describe('.transform(info, opts)', function () {
    it('invokes all intermediary formats', function () {
      const labelTimestamp = combine(
        label({ label: 'testing' }),
        timestamp()
      );

      const info = {
        level: 'info',
        message: 'wow such testing'
      };

      const actual = labelTimestamp.transform(Object.assign({}, info));
      assume(actual.level).equals(info.level);
      assume(actual.message).equals(info.message);
      assume(actual.timestamp).is.a('string');
      assume(actual.label).equals('testing');
    });

    it('{ false } when formats yield [false, obj, obj]', function () {
      const firstFalse = combine(
        formats.ignore(),
        formats.die(),
        formats.die()
      );

      assume(firstFalse.transform({
        level: 'info',
        message: 'lolwut'
      })).false();
    });

    it('{ false } when formats yield [obj, false, obj]', function () {
      const midFalse = combine(
        formats.identity(),
        formats.ignore(),
        formats.die()
      );

      assume(midFalse.transform({
        level: 'info',
        message: 'lolwut'
      })).false();
    });

    it('{ false } when formats yield [obj, obj, false]', function () {
      const lastFalse = combine(
        formats.identity(),
        formats.identity(),
        formats.ignore()
      );

      assume(lastFalse.transform({
        level: 'info',
        message: 'lolwut'
      })).false();
    });
  });
});
