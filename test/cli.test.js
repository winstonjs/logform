'use strict';

const assume = require('assume');
const colors = require('@colors/colors/safe');
const cli = require('../cli');
const {
  assumeFormatted,
  assumeHasPrototype,
  infoify,
  setupLevels
} = require('./helpers');
const { LEVEL, MESSAGE } = require('triple-beam');

describe('cli', () => {
  before(setupLevels);

  it('cli() (default) sets info[MESSAGE]', assumeFormatted(
    cli(),
    infoify({ level: 'info', message: 'whatever' }),
    (info) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(colors.green('info'));
      assume(info.message).equals('    whatever');

      assume(info[LEVEL]).is.a('string');
      assume(info[MESSAGE]).is.a('string');
      assume(info[LEVEL]).equals('info');
      assume(info[MESSAGE]).equals(`${colors.green('info')}:    whatever`);
    }
  ));

  it('exposes the Format prototype', assumeHasPrototype(cli));
});
