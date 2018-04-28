'use strict';

const util = require('util');
const assume = require('assume');
const prettyPrint = require('../pretty-print');
const helpers = require('./helpers');
const { MESSAGE } = require('triple-beam');

describe('prettyPrint', () => {
  it('prettyPrint() (default) sets info[MESSAGE]', helpers.assumeFormatted(
    prettyPrint(),
    { level: 'info', message: 'yay template strings are fast' },
    (info, expected) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('yay template strings are fast');
      assume(info[MESSAGE]).equals(util.inspect(expected));
    }
  ));
});
