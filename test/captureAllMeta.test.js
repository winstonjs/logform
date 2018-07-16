'use strict';

const assume = require('assume');
const captureAllMeta = require('../captureAllMeta');
// const simple = require('../simple');
const helpers = require('./helpers');
const { MESSAGE, SPLAT } = require('triple-beam');

describe('captureAllMeta', () => {

  it('captureAllMeta() does nothing with no splat',
    helpers.assumeFormatted(
      captureAllMeta(),
      { level: 'info', message: 'whatever' },
      info => {
        assume(info.level).is.a('string');
        assume(info.message).is.a('string');
        assume(info.level).equals('info');
        assume(info.message).equals('whatever');
        assume(info[MESSAGE]).equals(undefined);
        assume(info[SPLAT]).equals(undefined);
        assume(info.meta).deep.equals([]);
      }
    ));

  it('captureAllMeta() captures a single splat', helpers.assumeFormatted(
    captureAllMeta(),
    { level: 'info', message: 'whatever', [SPLAT]: [1, 2, 3] },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info[SPLAT]).is.an('array');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');
      assume(info.meta).deep.equals([1, 2, 3]);
      assume(info[SPLAT]).is.an('array');

      // assume(info[MESSAGE]).equals('info: whatever');
    }
  ));

  it('captureAllMeta() ignores { rest }', helpers.assumeFormatted(
    captureAllMeta(),
    { level: 'info', message: 'whatever', rest: 'something', [SPLAT]: { an: 'object' }},
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.rest).is.an('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');
      assume(info.rest).equals('something');
      assume(info.meta).deep.equals([{ an: 'object' }]);
      // assume(info[SPLAT]).is.an('array');
      // assume(info[MESSAGE]).equals('info: whatever {"rest":"something"}');
    }
  ));



  it('captureAllMeta() captures multiple splat', helpers.assumeFormatted(
    captureAllMeta(),
    { level: 'info', message: 'whatever',  [SPLAT]: [{ an: 'object' }, ['an', 'array']] },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');
      assume(info.meta).deep.equals([{ an: 'object' }, ['an', 'array']]);
      assume(info[SPLAT]).is.an('array');
      // assume(info[MESSAGE]).equals('info: whatever {"rest":"something"}');
    }
  ));

  it('captureAllMeta() captures an info.splat passed in an object', helpers.assumeFormatted(
    captureAllMeta(),
    { level: 'info', message: 'whatever',  splat: [{ an: 'object' }, ['an', 'array']] },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');
      assume(info.meta).deep.equals([{ an: 'object' }, ['an', 'array']]);
      assume(info[SPLAT]).equals(undefined);
      assume(Array.isArray(info.splat)).true();
      // assume(info[MESSAGE]).equals('info: whatever {"rest":"something"}');
    }
  ));

  it('captureAllMeta() captures multiple splat and info.splat', helpers.assumeFormatted(
    captureAllMeta(),
    { level: 'info', message: 'whatever',  [SPLAT]: [{ an: 'object' }, ['an', 'array']], splat: { another: 'object' }},
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');
      assume(info.meta).deep.equals([{ an: 'object' }, ['an', 'array'], { another: 'object' }]);
      assume(info[SPLAT]).is.an('array');
      // assume(info[MESSAGE]).equals('info: whatever {"rest":"something"}');
    }
  ));



});
