/* eslint no-unused-vars: 0 */
'use strict';

const assume = require('assume');
const helpers = require('./helpers');
const padLevels = require('../pad-levels');
const MESSAGE = Symbol.for('message');
const fixtures = require('./fixtures');
const Padder = padLevels.Padder;

describe('padLevels', function () {
  it('padLevels({ levels }) set the padding to info.padding', helpers.assumeFormatted(
    padLevels({ levels: fixtures.npm.levels }),
    { level: 'info', message: 'pad all the things' },
    function (info, expected) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.padding).is.an('object');
      assume(info.level).equals('info');
      assume(info.padding[info.level]).equals('    ');
      assume(info.message).equals('pad all the things');
      assume(info[MESSAGE]).equals(undefined);
    }
  ));

  it('padLevels({ levels, filler }) set the padding to info.padding with a custom filler', helpers.assumeFormatted(
    padLevels({ levels: fixtures.npm.levels, filler: 'foo' }),
    { level: 'info', message: 'pad all the things' },
    function (info, expected) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.padding).is.an('object');
      assume(info.level).equals('info');
      assume(info.padding[info.level]).equals('foof');
      assume(info.message).equals('pad all the things');
      assume(info[MESSAGE]).equals(undefined);
    }
  ));
});

it('exposes the Format prototype', helpers.assumeHasPrototype(padLevels));

describe('Colorizer', function () {
  const expected = Object.keys(Object.assign({},
    fixtures.cli.levels,
    fixtures.npm.levels,
    fixtures.syslog.levels
  ));

  it('Padder.addColors({ string: number })', function () {
    Padder.addPadding(Object.assign({},
      fixtures.cli.levels,
      fixtures.npm.levels,
      fixtures.syslog.levels
    ));

    const keys = Object.keys(Padder.allPadding);
    assume(keys).deep.equals(expected);

    const padding = Padder.allPadding[keys.pop()];
    assume(padding).to.be.a('string');
    assume(padding[0]).to.equal(' ');
  });

  it('Padder.addColors({ string: number }, string)', function () {
    Padder.addPadding(Object.assign({},
      fixtures.cli.levels,
      fixtures.npm.levels,
      fixtures.syslog.levels
    ), 'foo');

    const keys = Object.keys(Padder.allPadding);
    assume(keys).deep.equals(expected);

    const padding = Padder.allPadding[keys.pop()];
    assume(padding).to.be.a('string');
    assume(padding[0]).to.equal('f');
  });

  describe('#padder(levels, filler)', function () {
    const instance = new Padder();

    it('padd(levels) [all levels]', function () {
      assume(instance.addPadding(fixtures.npm.levels)).deep.equals({
        error: '   ',
        warn: '    ',
        info: '    ',
        http: '    ',
        verbose: ' ',
        debug: '   ',
        silly: '   '
      });
    });

    it('padder(levels, filler) [all levels]', function () {
      assume(instance.addPadding(fixtures.npm.levels, 'foo')).deep.equals({
        error: 'foo',
        warn: 'foof',
        info: 'foof',
        http: 'foof',
        verbose: 'f',
        debug: 'foo',
        silly: 'foo'
      });
    });
  });
});
