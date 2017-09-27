/*
 * config.test.js: Tests for winston.format
 *
 * (C) 2015 Charlie Robbins
 * MIT LICENSE
 *
 */

var path = require('path'),
    assume = require('assume'),
    colors = require('colors/safe'),
    spawn = require('cross-spawn-async'),
    winston = require('../../lib/winston'),
    helpers = require('../helpers');

var targetScript = path.join(__dirname, '..', 'helpers', 'scripts', 'colorize.js');

/**
 * Spawns the colorizer helper process for checking
 * if colors work in a non-tty environment
 */
function spawnColorizer(callback) {
  var child = spawn(process.execPath, [targetScript], { stdio: 'pipe' });
  var data = '';

  child.stdout.setEncoding('utf8')
  child.stdout.on('data', function (str) { data += str; });
  child.on('close', function () {
    callback(null, data);
  });
};

describe('winston.format.colorize', function () {
  it('default', helpers.assumeFormatted(
    winston.format.colorize(),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals('whatever');
    }
  ));

  it('{ level: true }', helpers.assumeFormatted(
    winston.format.colorize({ level: true }),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals('whatever');
    }
  ));

  it('{ message: true }', helpers.assumeFormatted(
    winston.format.colorize({ message: true }),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals(colors.green('whatever'));
    }
  ));

  it('{ level: true, message: true }', helpers.assumeFormatted(
    winston.format.colorize({ level: true, message: true }),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals(colors.green('whatever'));
    }
  ));

  it('{ all: true }', helpers.assumeFormatted(
    winston.format.colorize({ all: true }),
    { level: 'info', message: 'whatever' },
    function (info) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals(colors.green('whatever'));
    }
  ));

  it('non-TTY environment', function (done) {
    spawnColorizer(function (err, data) {
      assume(err).equals(null);
      assume(data).includes('\u001b[32mSimply a test\u001b[39m');
      done();
    })
  });
});
