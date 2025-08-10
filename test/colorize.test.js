/* eslint-disable no-process-env */
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

// eslint-disable-next-line max-statements
describe('colorize', () => {
  before(setupLevels);

  beforeEach(() => {
    process.env.NO_COLOR = undefined;
  });

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

  it('colorize() (default) when NO_COLOR env var is enabled', () => {
    process.env.NO_COLOR = 'true';
    assumeFormatted(
      colorize(),
      infoify({ level: 'info', message: 'whatever' }),
      info => {
        assume(info.level).is.a('string');
        assume(info.message).is.a('string');
        assume(info.level).equals('info');
        assume(info.message).equals('whatever');
      }
    );
  });

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

  it('colorize({ level: true }) when NO_COLOR env var is enabled', () => {
    process.env.NO_COLOR = 'true';
    assumeFormatted(
      colorize({ level: true }),
      infoify({ level: 'info', message: 'whatever' }),
      info => {
        assume(info.level).is.a('string');
        assume(info.message).is.a('string');
        assume(info.level).equals('info');
        assume(info.message).equals('whatever');
      }
    );
  });

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

  it('colorize{ message: true }) when NO_COLOR env var is enabled', () => {
    process.env.NO_COLOR = 'true';
    assumeFormatted(
      colorize({ message: true }),
      infoify({ level: 'info', message: 'whatever' }),
      info => {
        assume(info.level).is.a('string');
        assume(info.message).is.a('string');
        assume(info.level).equals('info');
        assume(info.message).equals('whatever');
      }
    );
  });

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

  it('colorize({ level: true, message: true }) when NO_COLOR env var is enabled', () => {
    process.env.NO_COLOR = 'true';
    assumeFormatted(
      colorize({ level: true, message: true }),
      infoify({ level: 'info', message: 'whatever' }),
      info => {
        assume(info.level).is.a('string');
        assume(info.message).is.a('string');
        assume(info.level).equals('info');
        assume(info.message).equals('whatever');
      }
    );
  });

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

  it('colorize({ all: true }) when NO_COLOR env var is enabled', () => {
    process.env.NO_COLOR = 'true';
    assumeFormatted(
      colorize({ all: true }),
      infoify({ level: 'info', message: 'whatever' }),
      info => {
        assume(info.level).is.a('string');
        assume(info.message).is.a('string');
        assume(info.level).equals('info');
        assume(info.message).equals('whatever');
      }
    );
  });

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

  it('colorize({ all: true }) [custom message] when NO_COLOR env var is enabled', () => {
    process.env.NO_COLOR = 'true';
    assumeFormatted(
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
        assume(info.level).equals('info');
        assume(info.message).equals('whatever');
        assume(info[MESSAGE]).equals('[info] whatever custom');
      }
    );
  });

  it('colorizes when LEVEL !== level', assumeFormatted(
    colorize(),
    { [LEVEL]: 'info', level: 'INFO', message: 'whatever' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('INFO'));
    }
  ));

  it('colorizes when LEVEL !== level when NO_COLOR is enabled', () => {
    process.env.NO_COLOR = 'true';

    assumeFormatted(
      colorize(),
      { [LEVEL]: 'info', level: 'INFO', message: 'whatever' },
      info => {
        assume(info.level).is.a('string');
        assume(info.message).is.a('string');
        assume(info.level).equals('INFO');
      }
    );
  });
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

  it('Colorizer.addColors({ string: string }) when NO_COLOR env var is enabled', () => {
    process.env.NO_COLOR = 'true';
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

  it('Colorizer.addColors({ string: [Array] }) when NO_COLOR env var is enabled', () => {
    process.env.NO_COLOR = 'true';
    Colorizer.addColors({ multiple: ['red', 'bold'] });
    assume(Colorizer.allColors.multiple).is.an('array');
    assume(Colorizer.allColors.multiple).deep.equals(['red', 'bold']);
  });

  // eslint-disable-next-line no-useless-escape
  it('Colorizer.addColors({ string: "(\w+)/s(\w+)" })', () => {
    Colorizer.addColors({ delimited: 'blue underline' });
    assume(Colorizer.allColors.delimited).deep.equals(['blue', 'underline']);
  });

  // eslint-disable-next-line no-useless-escape
  it('Colorizer.addColors({ string: "(\w+)/s(\w+)" }) when NO_COLOR env var is enabled', () => {
    process.env.NO_COLOR = 'true';
    Colorizer.addColors({ delimited: 'blue underline' });
    assume(Colorizer.allColors.delimited).deep.equals(['blue', 'underline']);
  });

  describe('#colorize(LEVEL, level, message)', () => {
    beforeEach(() => {
      process.env.NO_COLOR = undefined;
    });

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

  describe('#colorize(LEVEL, level, message) when NO_COLOR env var is enabled', () => {
    beforeEach(() => {
      process.env.NO_COLOR = 'true';
    });

    const instance = new Colorizer();

    it('colorize(level) [single color]', () => {
      assume(instance.colorize('weird', 'weird')).equals('weird');
    });

    it('colorize(level) [multiple colors]', () => {
      assume(instance.colorize('multiple', 'multiple')).equals(
        'multiple'
      );
    });

    it('colorize(level, message) [single color]', () => {
      assume(instance.colorize('weird', 'weird', 'message')).equals('message');
    });

    it('colorize(level, message) [multiple colors]', () => {
      assume(instance.colorize('multiple', 'multiple', 'message')).equals(
        'message'
      );
    });
  });
});
