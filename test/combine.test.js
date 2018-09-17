/* eslint-disable max-nested-callbacks */
'use strict';

const assume = require('assume');
const combine = require('../combine');
const label = require('../label');
const timestamp = require('../timestamp');
const { formats } = require('./helpers');

describe('combine', () => {
  it('exposes the cascade function', () => {
    assume(combine.cascade).is.a('function');
  });

  describe('combine(...formats)', () => {
    it('returns a function', () => {
      const fmt = combine(
        formats.identity(),
        formats.identity()
      );

      assume(fmt.transform).is.a('function');
      assume(fmt.options).deep.equals({});
    });

    it('exposes the Format prototype', () => {
      const fmt = combine(
        formats.identity(),
        formats.identity()
      );

      assume(fmt.Format).is.a('function');
      assume(fmt.Format.prototype.transform).is.a('function');
    });

    it('throws an error when provided a non-format', () => {
      assume(() => {
        combine(
          function lolwut() {},
          function notaformat() {}
        );
      }).throws();
    });
  });

  describe('.transform(info, opts)', () => {
    it('invokes all intermediary formats', () => {
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

    it('return the result of the transformation chain', () => {
      const assignedInfo = combine(
        formats.identity(),
        formats.assign({ key: 'value' }),
        formats.identity()
      );

      const info = {
        level: 'info',
        message: 'wow such testing'
      };

      const actual = assignedInfo.transform(Object.assign({}, info));
      assume(actual.level).equals(info.level);
      assume(actual.message).equals(info.message);
      assume(actual.key).is.a('string');
    });

    it('{ false } when formats yield [false, obj, obj]', () => {
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

    it('{ false } when formats yield [obj, false, obj]', () => {
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

    it('{ false } when formats yield [obj, obj, false]', () => {
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
