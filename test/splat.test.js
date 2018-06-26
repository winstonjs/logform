'use strict';

const { SPLAT } = require('triple-beam');
const assume = require('assume');
const splat = require('../splat');
const helpers = require('./helpers');

/*
 * Helper function for asserting that an info object
 * with the given { message, splat: spread } is properly interoplated
 * by the splat format into the `expected` value.
 */
function assumeSplat(message, spread, expected) {
  return helpers.assumeFormatted(
    splat(),
    { level: 'info', message, [SPLAT]: spread },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(Array.isArray(info[SPLAT])).true();

      // Prefer any user-defined assertion (if provided).
      if (typeof expected === 'function') {
        return expected(info);
      }

      assume(info.message).equals(expected);
    }
  );
}

describe('splat', () => {
  it('%s | string placeholder sets info.message', assumeSplat(
    'alright %s', ['what'], 'alright what'
  ));

  it('%d | number placeholder sets info.message', assumeSplat(
    'test message %d', [123], 'test message 123'
  ));

  it('%j | json placeholder sets info.message', assumeSplat(
    'test %j', [{ number: 123 }], 'test {"number":123}'
  ));

  it('balanced number of arguments to % | does not have "meta"', assumeSplat(
    'test %j', [{ number: 123 }], info => {
      assume(info.message).equals('test {"number":123}');
      assume(info.meta).equals(undefined);
    }
  ));

  it('%% | escaped % sets info.message', assumeSplat(
    'test %d%%', [100], 'test 100%'
  ));

  it('no % and no splat | returns the same info', assumeSplat(
    'nothing to see here', [], 'nothing to see here'
  ));

  it('no % but some splat | returns the same info', assumeSplat(
    'Look! No tokens!', ['ok'], info => {
      assume(info.message).equals('Look! No tokens!');
      assume(info.meta).equals(undefined);
    }
  ));

  it('Splat overflow (too many arguments) sets info.message', assumeSplat(
    '%s #%d, how are you %s',
    ['Hi', 42, 'feeling', { today: true }],
    info => {
      assume(info.message).equals('Hi #42, how are you feeling');
      assume(info.meta).deep.equals({ today: true });
    }
  ));
});
