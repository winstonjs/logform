'use strict';

const assume = require('assume');
const printf = require('../printf');
const helpers = require('./helpers');
const { MESSAGE } = require('triple-beam');

describe('printf', () => {
  it('printf(info => `${template}`) sets info[MESSAGE]', helpers.assumeFormatted(
    printf(info => `${info.level}: ${info.message}`),
    { level: 'info', message: 'yay template strings are fast' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('yay template strings are fast');
      assume(info[MESSAGE]).equals('info: yay template strings are fast');
    }
  ));
});
