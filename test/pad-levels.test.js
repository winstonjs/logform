'use strict';

const assume = require('assume');
const {
  assumeFormatted,
  assumeHasPrototype,
  infoify
} = require('./helpers');
const padLevels = require('../pad-levels');
const { configs, MESSAGE } = require('triple-beam');
const Padder = padLevels.Padder;

const longLevels = Object.assign({}, configs.npm.levels);
longLevels['really-really-long'] = 7;

describe('padLevels', () => {
  it('padLevels({ levels }) set the padding to info.padding', assumeFormatted(
    padLevels(),
    infoify({ level: 'info', message: 'pad all the things' }),
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('    pad all the things');
      assume(info[MESSAGE]).equals('    pad all the things');
    }
  ));

  it('padLevels({ levels }) set the padding to info.padding', assumeFormatted(
    padLevels({ levels: longLevels }),
    infoify({ level: 'info', message: 'pad all the things' }),
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');

      assume(info.message).equals('               pad all the things');
      assume(info[MESSAGE]).equals('               pad all the things');
    }
  ));

  it('padLevels({ levels, filler }) set the padding to info.padding with a custom filler', assumeFormatted(
    padLevels({ levels: configs.npm.levels, filler: 'foo' }),
    infoify({ level: 'info', message: 'pad all the things' }),
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('foofpad all the things');
      assume(info[MESSAGE]).equals('foofpad all the things');
    }
  ));

  it('exposes the Format prototype', assumeHasPrototype(padLevels));
});

describe('Padder', () => {
  const expected = Object.keys(Object.assign({},
    configs.cli.levels,
    configs.npm.levels,
    configs.syslog.levels
  ));

  it('Padder.paddingForLevels({ string: number })', () => {
    const paddings = Padder.paddingForLevels(Object.assign({},
      configs.cli.levels,
      configs.npm.levels,
      configs.syslog.levels
    ));

    const keys = Object.keys(paddings);
    assume(keys).deep.equals(expected);

    const padding = paddings[keys.pop()];
    assume(padding).to.be.a('string');
    assume(padding[0]).to.equal(' ');
  });

  it('Padder.paddingForLevels({ string: number }, string)', () => {
    const paddings = Padder.paddingForLevels(Object.assign({},
      configs.cli.levels,
      configs.npm.levels,
      configs.syslog.levels
    ), 'foo');

    const keys = Object.keys(paddings);
    assume(keys).deep.equals(expected);

    const padding = paddings[keys.pop()];
    assume(padding).to.be.a('string');
    assume(padding[0]).to.equal('f');
  });
});
