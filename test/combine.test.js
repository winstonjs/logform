/* eslint-disable max-nested-callbacks */
'use strict';

const assume = require('assume');
const combine = require('../combine');
const label = require('../label');
const timestamp = require('../timestamp');
const { formats } = require('./helpers');
const { format } = require('../');
const { LEVEL, MESSAGE } = require('triple-beam');
const colors = require('@colors/colors/safe');

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

  describe('level padding compositions', () => {
    const levels = { 'info': 0, 'verbose': 1, 'really-really-long': 2 };
    const levelColors = { 'info': 'blue', 'verbose': 'cyan', 'really-really-long': 'yellow' };
    const { Colorizer } = require('../colorize');
    let originalColors;

    beforeEach(() => {
      originalColors = Colorizer.allColors;
    });

    afterEach(() => {
      Colorizer.allColors = originalColors;
    });

    function assertAligned(fmt, column, metadata = '') {
      Object.keys(levels).forEach(level => {
        const actual = fmt.transform({
          level,
          [LEVEL]: level,
          message: 'message',
          requestId: 42
        });
        const output = colors.stripColors(actual[MESSAGE]);

        assume(output.indexOf('message')).equals(column);
        assume(output.slice(column)).equals(`message${metadata}`);
        assume(actual[LEVEL]).equals(level);
        assume(colors.stripColors(actual.level)).equals(level);
        assume(actual.requestId).equals(42);
      });
    }

    it('aligns the README simple example using the default npm levels', () => {
      const fmt = combine(format.padLevels(), format.simple());
      const output = ['info', 'verbose'].map(level => {
        return fmt.transform({ level, [LEVEL]: level, message: 'my message' })[MESSAGE];
      });

      assume(output).deep.equals(['info:     my message', 'verbose:  my message']);
    });

    it('aligns custom levels with simple while retaining metadata', () => {
      assertAligned(combine(format.padLevels({ levels }), format.simple()),
        21, ' {"requestId":42}');
    });

    it('uses the raw LEVEL symbol when padding colorized levels', () => {
      assertAligned(combine(
        format.colorize({ colors: levelColors }),
        format.padLevels({ levels }),
        format.simple()
      ), 21, ' {"requestId":42}');
    });

    it('preserves alignment when coloring both the level and padded message', () => {
      assertAligned(combine(
        format.padLevels({ levels }),
        format.colorize({ colors: levelColors, all: true }),
        format.simple()
      ), 21, ' {"requestId":42}');
    });

    it('preserves alignment when removing colors before simple', () => {
      assertAligned(combine(
        format.colorize({ colors: levelColors }),
        format.padLevels({ levels }),
        format.uncolorize(),
        format.simple()
      ), 21, ' {"requestId":42}');
    });

    it('aligns a printf layout with a fixed-width prefix', () => {
      assertAligned(combine(
        format.padLevels({ levels }),
        format.printf(info => `[app] ${info.level}:${info.message}`)
      ), 26);
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
