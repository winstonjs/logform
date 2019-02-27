'use strict';

const util = require('util');
const assume = require('assume');
const prettyPrint = require('../pretty-print');
const { assumeFormatted, infoify } = require('./helpers');
const { LEVEL, MESSAGE, SPLAT } = require('triple-beam');

describe('prettyPrint', () => {
  it('prettyPrint() (default) sets info[MESSAGE]', assumeFormatted(
    prettyPrint(),
    infoify({ level: 'info', message: 'yay template strings are fast' }),
    (info, expected) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('yay template strings are fast');

      const stripped = Object.assign({}, expected);
      delete stripped[LEVEL];
      delete stripped[MESSAGE];
      delete stripped[SPLAT];

      assume(info[MESSAGE]).equals(util.inspect(stripped));
    }
  ));

  it('prettyPrint() (default) strips info[SPLAT]', assumeFormatted(
    prettyPrint(),
    infoify({
      level: 'info',
      message: 'yay template strings are fast',
      [SPLAT]: [1, 2, 3]
    }),
    (info, expected) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('yay template strings are fast');

      const stripped = Object.assign({}, expected);
      delete stripped[LEVEL];
      delete stripped[MESSAGE];
      delete stripped[SPLAT];

      assume(info[MESSAGE]).equals(util.inspect(stripped));
    }
  ));
});
