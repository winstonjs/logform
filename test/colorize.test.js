'use strict';

const assume = require('assume');
const colors = require('colors');
const colorize = require('../colorize');
const helpers = require('./helpers');
const { configs } = require('triple-beam');
const Colorizer = colorize.Colorizer;

describe('colorize', () => {
  before(helpers.setupLevels);

  it('colorize() (default)', helpers.assumeFormatted(
    colorize(),
    { level: 'info', message: 'whatever' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals('whatever');
    }
  ));

  it('colorize({ level: true })', helpers.assumeFormatted(
    colorize({ level: true }),
    { level: 'info', message: 'whatever' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals('whatever');
    }
  ));

  it('colorize{ message: true })', helpers.assumeFormatted(
    colorize({ message: true }),
    { level: 'info', message: 'whatever' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals(colors.green('whatever'));
    }
  ));

  it('colorize({ level: true, message: true })', helpers.assumeFormatted(
    colorize({ level: true, message: true }),
    { level: 'info', message: 'whatever' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals(colors.green('whatever'));
    }
  ));

  it('colorize({ all: true })', helpers.assumeFormatted(
    colorize({ all: true }),
    { level: 'info', message: 'whatever' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals(colors.green('whatever'));
    }
  ));
});

it('exposes the Format prototype', helpers.assumeHasPrototype(colorize));

describe('Colorizer', () => {
  const expected = Object.assign({},
    configs.cli.colors,
    configs.npm.colors,
    configs.syslog.colors);

  before(helpers.setupLevels);

  it('Colorizer.addColors({ string: string })', () => {
    Colorizer.addColors({ weird: 'cyan' });

    assume(Colorizer.allColors).deep.equals(
      Object.assign({}, expected, { weird: 'cyan' })
    );
  });

  it('Colorizer.addColors({ string: [Array] })', () => {
    Colorizer.addColors({ multiple: ['red', 'bold'] });
    assume(Colorizer.allColors.multiple).is.an('array');
    assume(Colorizer.allColors.multiple).deep.equals(['red', 'bold']);
  });

  // eslint-disable-next-line no-useless-escape
  it('Colorizer.addColors({ string: "(\w+)/s(\w+)" })', () => {
    Colorizer.addColors({ delimited: 'blue underline' });
    assume(Colorizer.allColors.delimited).deep.equals(['blue', 'underline']);
  });

  describe('#colorize(level,message)', () => {
    const instance = new Colorizer();

    it('colorize(level) [single color]', () => {
      assume(instance.colorize('weird')).equals(colors.cyan('weird'));
    });

    it('colorize(level) [multiple colors]', () => {
      assume(instance.colorize('multiple')).equals(
        colors.bold(colors.red('multiple'))
      );
    });

    it('colorize(level, message) [single color]', () => {
      assume(instance.colorize('weird', 'message')).equals(colors.cyan('message'));
    });

    it('colorize(level, message) [multiple colors]', () => {
      assume(instance.colorize('multiple', 'message')).equals(
        colors.bold(colors.red('message'))
      );
    });
  });
});
