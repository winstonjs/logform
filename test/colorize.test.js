/*
 * config.test.js: Tests for winston.format
 *
 * (C) 2015 Charlie Robbins
 * MIT LICENSE
 *
 */

const assume = require('assume');
const colorize = require('../colorize');
const helpers = require('./helpers');

describe('winston.format.colorize', function () {
  it('default', helpers.assumeFormatted(
    colorize(),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals('whatever');
    }
  ));

  it('{ level: true }', helpers.assumeFormatted(
    colorize({ level: true }),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals('whatever');
    }
  ));

  it('{ message: true }', helpers.assumeFormatted(
    colorize({ message: true }),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals(colors.green('whatever'));
    }
  ));

  it('{ level: true, message: true }', helpers.assumeFormatted(
    colorize({ level: true, message: true }),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals(colors.green('whatever'));
    }
  ));

  it('{ all: true }', helpers.assumeFormatted(
    colorize({ all: true }),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals(colors.green('whatever'));
    }
  ));
});
