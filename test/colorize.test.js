'use strict';

const assume = require('assume');
const colors = require('colors');
const colorize = require('../colorize');
const helpers = require('./helpers');
const fixtures = require('./fixtures');
const Colorizer = colorize.Colorizer;

describe('colorize', function () {
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

it('exposes the Format prototype', helpers.assumeHasPrototype(colorize));

describe('Colorizer', function () {
  var expected = Object.assign({},
    fixtures.cli.colors,
    fixtures.npm.colors,
    fixtures.syslog.colors);

  it('Colorizer.addColors({ string: string })', function () {
    Colorizer.addColors({ weird: 'cyan' });

    assume(Colorizer.allColors).deep.equals(
      Object.assign({}, expected, { weird: 'cyan' })
    );
  });

  it('Colorizer.addColors({ string: [Array] })', function () {
    Colorizer.addColors({ multiple: ['red', 'bold'] });
    assume(Colorizer.allColors.multiple).is.an('array');
    assume(Colorizer.allColors.multiple).deep.equals(['red', 'bold']);
  });

  it('Colorizer.addColors({ string: "(\w+)/s(\w+)" })', function () {
    Colorizer.addColors({ delimited: 'blue underline' });
    assume(Colorizer.allColors.delimited).deep.equals(['blue', 'underline']);
  });

  describe('#colorize(level,message)', function () {
    const instance = new Colorizer();

    it('colorize(level) [single color]', function () {
      assume(instance.colorize('weird')).equals(colors.cyan('weird'));
    });

    it('colorize(level) [multiple colors]', function () {
      assume(instance.colorize('multiple')).equals(
        colors.bold(colors.red('multiple'))
      );
    });

    it('colorize(level, message) [single color]', function () {
      assume(instance.colorize('weird', 'message')).equals(colors.cyan('message'));
    });

    it('colorize(level, message) [multiple colors]', function () {
      assume(instance.colorize('multiple', 'message')).equals(
        colors.bold(colors.red('message'))
      );
    });
  });
});
