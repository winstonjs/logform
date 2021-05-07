'use strict';

const assume = require('assume');
const errors = require('../errors');
const { assumeFormatted } = require('./helpers');
const { MESSAGE } = require('triple-beam');

const err = new Error('whatever');

const errProps = new Error('another error');
errProps.whatever = true;
errProps.wut = 'some string';

const errInfo = new Error('Already has level');
errInfo.level = 'error';

const errInfoProps = new Error('Level with props');
errInfoProps.level = 'error';
errInfoProps.whatever = true;
errInfoProps.wut = 'some string';

const errLateMessage = new Error();
errLateMessage.message = 'whatever';

describe('errors()({ object })', () => {
  it('errors() returns the original info', assumeFormatted(
    errors(),
    { level: 'info', message: 'whatever' },
    (info) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');
    }
  ));

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

  it('errors({ stack: true }) sets info.stack', assumeFormatted(
    errors({ stack: true }),
    { level: 'info', message: err },
    (info) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals(err.message + '\n' + err.stack);
      assume(info[MESSAGE]).equals(err.message + '\n' + err.stack);
      assume(info.stack).equals(err.stack);
    }
  ));

  it('errors() sets custom error properties', assumeFormatted(
    errors(),
    { level: 'info', message: errProps },
    (info) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals(errProps.message);
      assume(info[MESSAGE]).equals(errProps.message);
      assume(info.whatever).true();
      assume(info.wut).equals('some string');
    }
  ));

  it('errors() works with a late-initialized message', assumeFormatted(
    errors(),
    { level: 'info', message: errLateMessage },
    (info) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals(errLateMessage.message);
      assume(info[MESSAGE]).equals(errLateMessage.message);
    }
  ));
});

describe('errors()(Error)', () => {
  it('errors() (default) sets info[MESSAGE]', assumeFormatted(
    errors(),
    errInfo,
    (info) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(errInfo.level);
      assume(info.message).equals(errInfo.message);
      assume(info[MESSAGE]).equals(errInfo.message);
    },
    { immutable: false }
  ));

  it('errors({ stack: true }) includes error stack into message.', assumeFormatted(
    errors({ stack: true }),
    errInfo,
    (info) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals(errInfo.level);
      assume(info.message).equals(errInfo.message + '\n' + errInfo.stack);
      assume(info[MESSAGE]).equals(errInfo.message + '\n' + errInfo.stack);
      assume(info.stack).equals(errInfo.stack);
    },
    { immutable: false }
  ));
});
