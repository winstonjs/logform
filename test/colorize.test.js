'use strict';

const assume = require('assume');
const colors = require('@colors/colors/safe');
const { configs, LEVEL, MESSAGE } = require('triple-beam');
const colorize = require('../colorize');
const Colorizer = colorize.Colorizer;
const {
  assumeHasPrototype,
  assumeFormatted,
  infoify,
  setupLevels
} = require('./helpers');

describe('colorize', () => {
  before(setupLevels);

  it('colorize() (default)', assumeFormatted(
    colorize(),
    infoify({ level: 'info', message: 'whatever' }),
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals('whatever');
    }
  ));

  it('colorize({ level: true })', assumeFormatted(
    colorize({ level: true }),
    infoify({ level: 'info', message: 'whatever' }),
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals('whatever');
    }
  ));

  it('colorize{ message: true })', assumeFormatted(
    colorize({ message: true }),
    infoify({ level: 'info', message: 'whatever' }),
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals(colors.green('whatever'));
    }
  ));

  it('colorize({ level: true, message: true })', assumeFormatted(
    colorize({ level: true, message: true }),
    infoify({ level: 'info', message: 'whatever' }),
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals(colors.green('whatever'));
    }
  ));

  it('colorize({ all: true })', assumeFormatted(
    colorize({ all: true }),
    infoify({ level: 'info', message: 'whatever' }),
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals(colors.green('whatever'));
    }
  ));

  it('colorize({ all: true }) [custom message]', assumeFormatted(
    colorize({ all: true }),
    {
      level: 'info',
      [LEVEL]: 'info',
      message: 'whatever',
      [MESSAGE]: '[info] whatever custom'
    },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info[LEVEL]).equals('info');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals(colors.green('whatever'));
      assume(info[MESSAGE]).equals(colors.green('[info] whatever custom'));
    }
  ));

  it('colorizes when LEVEL !== level', assumeFormatted(
    colorize(),
    { [LEVEL]: 'info', level: 'INFO', message: 'whatever' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('INFO'));
    }
  ));
});

describe('Colorizer', () => {
  const expected = Object.assign({},
    configs.cli.colors,
    configs.npm.colors,
    configs.syslog.colors);

  before(setupLevels);

  it('exposes the Format prototype', assumeHasPrototype(colorize));

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

  describe('#colorize(LEVEL, level, message)', () => {
    const instance = new Colorizer();

    it('colorize(level) [single color]', () => {
      assume(instance.colorize('weird', 'weird')).equals(colors.cyan('weird'));
    });

    it('colorize(level) [multiple colors]', () => {
      assume(instance.colorize('multiple', 'multiple')).equals(
        colors.bold(colors.red('multiple'))
      );
    });

    it('colorize(level, message) [single color]', () => {
      assume(instance.colorize('weird', 'weird', 'message')).equals(colors.cyan('message'));
    });

    it('colorize(level, message) [multiple colors]', () => {
      assume(instance.colorize('multiple', 'multiple', 'message')).equals(
        colors.bold(colors.red('message'))
      );
    });
  });
});
