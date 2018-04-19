/* eslint no-unused-vars: 0 */
'use strict';

const assume = require('assume');
const json = require('../json');
const helpers = require('./helpers');
const MESSAGE = Symbol.for('message');

describe('json', function () {
  it('json() (default) sets info[MESSAGE]', helpers.assumeFormatted(
    json(),
    { level: 'info', message: 'whatever' },
    function (info, expected) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');

      const raw = JSON.stringify(expected);
      assume(info[MESSAGE]).equals(raw);
      assume(JSON.stringify(info)).equals(raw);
    }
  ));

  it.only('json() (default) properly serializes a Buffer', helpers.assumeFormatted(
    json(),
    { level: 'info', message: Buffer.from('Please do not log buffers') },
    function (info, expected) {
      //console.dir(info);

      console.log(Buffer.isBuffer(expected.message));
    }
  ));


  it('json({ space: 2 }) sets info[MESSAGE]', helpers.assumeFormatted(
    json({ space: 2 }),
    { level: 'info', message: '2 spaces 4 lyfe' },
    function (info, expected) {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('2 spaces 4 lyfe');
      assume(info[MESSAGE]).equals(JSON.stringify(expected, null, 2));
    }
  ));

  it('json({ replacer }) sets info[MESSAGE]', helpers.assumeFormatted(
    json({
      replacer: function onlyLevelAndMessage(key, value) {
        if (key === 'filtered') { return undefined; }
        return value;
      }
    }),
    { level: 'info', message: 'replacer', filtered: true },
    function (info, expected) {
      const { level, message } = info;
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.filtered).equals(true);
      assume(info.level).equals('info');
      assume(info.message).equals('replacer');
      assume(info[MESSAGE]).equals(JSON.stringify({ level, message }));
    }
  ));

  it('exposes the Format prototype', helpers.assumeHasPrototype(json));
});
