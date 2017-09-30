'use strict';

const assume = require('assume');
const colors = require('colors');
const colorize = require('../colorize');
const combine = require('../combine');
const format = require('../format');
const simple = require('../simple');
const uncolorize = require('../uncolorize');
const helpers = require('./helpers');
const fixtures = require('./fixtures');
const MESSAGE = Symbol.for('message');
const COLORED = Symbol.for('colored');

//
// Test focused format to store a copy of
// the colorized content for later comparison
//
const rememberColors = format(info => {
  info[COLORED] = {
    [MESSAGE]: info[MESSAGE],
    level: info.level,
    message: info.message
  }

  return info;
});

/*
 * Helper function to return a testable format that
 * transitions from colors to uncolored
 */
function addAndRemoveColors(opts = {}) {
  return combine(
    colorize({ all: true }),
    simple(),
    rememberColors(),
    uncolorize(opts)
  );
}

describe('uncolorize', function () {
  it('uncolorize() (default) removes all colors', helpers.assumeFormatted(
    addAndRemoveColors(),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');

      const colored = info[COLORED];
      assume(info.level).equals('info');
      assume(info.level).not.equals(colored.level);
      assume(info.level).equals(colors.strip(colored.level));

      assume(info.message).equals('whatever');
      assume(info.message).equals(colors.strip(colored.message));
      assume(info.message).not.equals(colored.message);

      assume(info[MESSAGE]).equals('info: whatever {}');
      assume(info[MESSAGE]).equals(colors.strip(colored[MESSAGE]));
      assume(info[MESSAGE]).not.equals(colored[MESSAGE]);
    }
  ));

  it('uncolorize({ level: false }) removes color from { message, [MESSAGE] }', helpers.assumeFormatted(
    addAndRemoveColors({ level: false }),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');

      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals('whatever');
      assume(info[MESSAGE]).equals('info: whatever {}');
    }
  ));

  it('uncolorize({ message: false }) removes color from { level, [MESSAGE] }', helpers.assumeFormatted(
    addAndRemoveColors({ message: false }),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');

      assume(info.level).equals('info');
      assume(info.message).equals(colors.green('whatever'));
      assume(info[MESSAGE]).equals('info: whatever {}');
    }
  ));

  it('uncolorize({ raw: false }) removes color from { level, message }', helpers.assumeFormatted(
    addAndRemoveColors({ raw: false }),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');

      assume(info.level).equals('info');
      assume(info.message).equals('whatever');
      assume(info[MESSAGE]).equals(info[COLORED][MESSAGE]);
    }
  ));

  it('uncolorize({ level: false, message: false }) removes color from [MESSAGE]', helpers.assumeFormatted(
    addAndRemoveColors({ level: false, message: false }),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');

      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals(colors.green('whatever'));
      assume(info[MESSAGE]).equals('info: whatever {}');
    }
  ));
});
