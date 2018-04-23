/* eslint no-unused-vars: 0 */
'use strict';

const assume = require('assume');
const helpers = require('./helpers');
const padLevels = require('../pad-levels');
const MESSAGE = Symbol.for('message');

describe('ms', function () {
  it('padLevels({ levels }) set the padding to info.padding', helpers.assumeFormatted(
    padLevels({
      levels: {
        foo: 0,
        bar: 1,
        baz: 2,
        foobar: 3
      }
    }),
    { level: 'info', message: 'pad all the things' },
    function (info, expected) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.padding).is.a('string');
      assume(info.level).equals('info');
      assume(info.padding).equals('   ');
      assume(info.message).equals('pad all the things');
      assume(info[MESSAGE]).equals(undefined);
    }
  ));

  it('padLevels({ levels, filler }) set the padding to info.padding with a custom filler', helpers.assumeFormatted(
    padLevels({
      levels: {
        foo: 0,
        bar: 1,
        baz: 2,
        foobar: 3
      },
      filler: 'foo'
    }),
    { level: 'info', message: 'pad all the things' },
    function (info, expected) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.padding).is.a('string');
      assume(info.level).equals('info');
      assume(info.padding).equals('foo');
      assume(info.message).equals('pad all the things');
      assume(info[MESSAGE]).equals(undefined);
    }
  ));
});
