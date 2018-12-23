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
  it('basic string', assumeSplat(
    'just a string', [], 'just a string'
  ));

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

  it('more arguments than % | multiple "meta"', assumeSplat(
    'test %j', [{ number: 123 }, { an: 'object' }, ['an', 'array']], info => {
      assume(info.message).equals('test {"number":123}');
      assume(info.an).equals('object');
      assume(info[0]).equals('an');
      assume(info[1]).equals('array');
    }
  ));

  it('%% | escaped % sets info.message', assumeSplat(
    'test %d%%', [100], 'test 100%'
  ));

  it('no % and one object | returns the message and properties', assumeSplat(
    'see an object', [{ an: 'object' }], info => {
      assume(info.message).equals('see an object');
      assume(info.an).equals('object');
    }
  ));

  it('no % and two objects | returns the string and all properties', assumeSplat(
    'lots to see here', [{ an: 'object' }, ['an', 'array']], info => {
      assume(info.message).equals('lots to see here');
      assume(info.an).equals('object');
      assume(info[0]).equals('an');
      assume(info[1]).equals('array');
    }
  ));

  it('no % and no splat | returns the same info', assumeSplat(
    'nothing to see here', [], info => {
      assume(info.message).equals('nothing to see here');
      assume(info.meta).equals(undefined);
    }
  ));

  it('no % but some splat | returns the same message with new properties', assumeSplat(
    'Look! No tokens!', ['ok'], info => {
      assume(info.message).equals('Look! No tokens!');
      assume(info[0]).equals('o');
      assume(info[1]).equals('k');
    }
  ));

  it('Splat overflow (too many arguments) sets info.message', assumeSplat(
    '%s #%d, how are you %s',
    ['Hi', 42, 'feeling', { today: true }],
    info => {
      assume(info.message).equals('Hi #42, how are you feeling');
      assume(info.today).true();
    }
  ));

  it('No [SPLAT] does not crash', () => {
    return helpers.assumeFormatted(
      splat(),
      { level: 'info', message: 'Why hello %s!' },
      info => {
        assume(info.level).is.a('string');
        assume(info.message).is.a('string');
        assume(info[SPLAT]).equals(undefined);
        assume(info.message).equals('Why hello %s!');
      }
    );
  });

  it('tests info.splat as passed in with an object', () => {
    return helpers.assumeFormatted(
      splat(),
      {
        level: 'info',
        message: '%d: The answer to life, the universe and everything',
        splat: [42]
      },
      info => {
        assume(info.level).is.a('string');
        assume(info.message).is.a('string');

        assume(info.message).equals('info: 42: The answer to life, the universe and everything');
      }
    );
  });

});
