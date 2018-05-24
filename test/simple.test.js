'use strict';

const assume = require('assume');
const simple = require('../simple');
const helpers = require('./helpers');
const { MESSAGE } = require('triple-beam');

describe('simple', () => {
  it('simple() (default) sets info[MESSAGE]', helpers.assumeFormatted(
    simple(),
    { level: 'info', message: 'whatever' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');

      assume(info[MESSAGE]).equals('info: whatever');
    }
  ));

  it('simple() strips { splat }', helpers.assumeFormatted(
    simple(),
    { level: 'info', message: 'whatever', splat: [1, 2, 3] },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.splat).is.an('array');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');
      assume(info.splat).deep.equals([1, 2, 3]);

      assume(info[MESSAGE]).equals('info: whatever');
    }
  ));

  it('simple() shows { rest }', helpers.assumeFormatted(
    simple(),
    { level: 'info', message: 'whatever', rest: 'something' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.rest).is.an('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');
      assume(info.rest).equals('something');

      assume(info[MESSAGE]).equals('info: whatever {"rest":"something"}');
    }
  ));
});
