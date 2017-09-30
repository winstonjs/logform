'use strict';

const assume = require('assume');
const combine = require('../combine');
const splat = require('../splat');
const helpers = require('./helpers');
const MESSAGE = Symbol.for('message');

/*
 * Helper function for asserting that an info object
 * with the given { message, splat: spread } is properly interoplated
 * by the splat format into the `expected` value.
 */
function assumeSplat(message, spread, expected) {
  return helpers.assumeFormatted(
    splat(),
    { level: 'info', message, splat: spread },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(Array.isArray(info.splat)).true();

      assume(info.message).equals(expected);
    }
  );
}

describe('splat', function () {
  it('%s | string placeholder sets info.message', assumeSplat(
    'alright %s', ['what'], 'alright what')
  );

  it('%d | number placeholder sets info.message', assumeSplat(
    'test message %d', [123], 'test message 123')
  );

  it('%j | json placeholder sets info.message', assumeSplat(
    'test %j', [{ number: 123 }], 'test {"number":123}')
  );

  it('%% | escaped % sets info.message', assumeSplat(
    'test %d%%', [100], 'test 100%')
  );

  it('Splat overflow (too many arguments) sets info.message', assumeSplat(
    '%s #%d, how are you %s',
    ['Hi', 42, 'feeling', { today: true }],
    'Hi #42, how are you feeling { today: true }'
  ));
});
