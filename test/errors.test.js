'use strict';

const assume = require('assume');
const errors = require('../errors');
const { assumeFormatted } = require('./helpers');
const { MESSAGE } = require('triple-beam');

const err = new Error('whatever');

describe('json', () => {
  it('errors() (default) sets info[MESSAGE]', assumeFormatted(
    errors(),
    { level: 'info', message: err },
    (info) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals(err.message);
      assume(info[MESSAGE]).equals(err.message);
    }
  ));

  it('json({ space: 2 }) sets info[MESSAGE]', assumeFormatted(
    errors({ stack: true }),
    { level: 'info', message: err },
    (info) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals(err.message);
      assume(info.stack).equals(err.stack);
      assume(info[MESSAGE]).equals(err.message);
    }
  ));
});
