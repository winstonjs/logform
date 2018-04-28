'use strict';

const assume = require('assume');
const timestamp = require('../timestamp');
const helpers = require('./helpers');

describe('timestamp', () => {
  it('timestamp() (default) sets info[timestamp]', helpers.assumeFormatted(
    timestamp(),
    { level: 'info', message: 'whatever', timestamp: new Date().toISOString() },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');
      assume(info.timestamp).is.a('string');
    }
  ));

  it('timestamp({ format: () => { return \'test timestamp\'; } }) sets info[timestamp]', helpers.assumeFormatted(
    timestamp({
      format: () => {
        return 'test timestamp';
      }
    }),
    { level: 'info', message: 'whatever', timestamp: 'test timestamp' },
    (info, expected) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');
      assume(info.timestamp).is.a('string');
      assume(info.timestamp).equals('test timestamp');

      const raw = JSON.stringify(expected);
      assume(JSON.stringify(info)).equals(raw);
    }
  ));

  it('timestamp({ format: \'YYYY-MM-DD\' }) sets info[timestamp]', helpers.assumeFormatted(
    timestamp({
      format: 'YYYY-MM-DD'
    }),
    { level: 'info', message: 'whatever', timestamp: new Date().toISOString() },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');
      assume(info.timestamp).is.a('string');
    }
  ));

  it('exposes the Format prototype', helpers.assumeHasPrototype(timestamp));
});
