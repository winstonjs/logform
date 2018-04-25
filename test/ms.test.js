/* eslint no-unused-vars: 0 */
'use strict';

const assume = require('assume');
const helpers = require('./helpers');
const ms = require('../ms');
const { MESSAGE } = require('triple-beam');

describe('ms', function () {
  it('ms() set the ms to info.ms', helpers.assumeFormatted(
    ms(),
    { level: 'info', message: 'time all the things' },
    function (info, expected) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.ms).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('time all the things');
      assume(info[MESSAGE]).equals(undefined);
    }
  ));
});
