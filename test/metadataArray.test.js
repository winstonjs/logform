'use strict';

const assume = require('assume');
const metadataArray = require('../metadataArray');
const helpers = require('./helpers');
const { MESSAGE, SPLAT } = require('triple-beam');

describe('metadataArray', () => {

  it('metadataArray() does nothing with no splat',
    helpers.assumeFormatted(
      metadataArray(),
      { level: 'info', message: 'whatever' },
      info => {
        assume(info.level).is.a('string');
        assume(info.message).is.a('string');
        assume(info.level).equals('info');
        assume(info.message).equals('whatever');
        assume(info[MESSAGE]).equals(undefined);
        assume(info[SPLAT]).equals(undefined);
      }
    ));

  it('metadataArray() captures a single splat', helpers.assumeFormatted(
    metadataArray(),
    { level: 'info', message: 'whatever', [SPLAT]: [1, 2, 3] },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever 1, 2, 3');
      assume(info[SPLAT]).equals(undefined);
    }
  ));

  it('metadataArray() ignores { rest }', helpers.assumeFormatted(
    metadataArray(),
    { level: 'info', message: 'whatever', rest: 'something', [SPLAT]: [{ an: 'object' }] },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.rest).is.an('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever {"an":"object"}');
      assume(info.rest).equals('something');
      assume(info[SPLAT]).deep.equals(undefined);
    }
  ));



  it('metadataArray() captures multiple splat', helpers.assumeFormatted(
    metadataArray(),
    { level: 'info', message: 'whatever',  [SPLAT]: [{ an: 'object' }, ['an', 'array']] },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever {"an":"object"}, ["an","array"]');
      assume(info[SPLAT]).deep.equals(undefined);
    }
  ));

  it('metadataArray() captures an info.splat passed in an object', helpers.assumeFormatted(
    metadataArray(),
    { level: 'info', message: 'whatever',  splat: [{ an: 'object' }, ['an', 'array']] },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');
      assume(info[SPLAT]).equals(undefined);
      assume(Array.isArray(info.splat)).true();
      assume(info.splat).deep.equals([{ an: 'object' }, ['an', 'array']]);
    }
  ));

  it('metadataArray() captures multiple splat and info.splat', helpers.assumeFormatted(
    metadataArray(),
    { level: 'info', message: 'whatever',  [SPLAT]: [{ an: 'object' }, ['an', 'array']], splat: { another: 'object' }},
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever {"an":"object"}, ["an","array"]');
      assume(info[SPLAT]).deep.equals(undefined);
      assume(info.splat).deep.equals({ another: 'object' });

    }
  ));

  it('metadataArray() captures multiple splat and info.splat', helpers.assumeFormatted(
    metadataArray(),
    { level: 'info', message: 'whatever',  [SPLAT]: [{ an: 'object' }, ['an', 'array'], new Error('Catch me')] },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message.substring(0, 79)).equals('whatever {"an":"object"}, ["an","array"], Error: Catch me\n    at Suite.describe');
      assume(info[SPLAT]).deep.equals(undefined);
    }
  ));

  it('metadataArray() captures multiple splat and info.splat', helpers.assumeFormatted(
    metadataArray({ messageSplatDelimeter: ':', innerSplatDelimeter: '\n\t' }),
    { level: 'info', message: 'whatever',  [SPLAT]: [{ an: 'object' }, ['an', 'array']] },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever:{"an":"object"}\n\t["an","array"]');
      assume(info[SPLAT]).deep.equals(undefined);
    }
  ));


});
