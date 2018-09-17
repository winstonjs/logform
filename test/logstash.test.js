'use strict';

const assume = require('assume');
const combine = require('../combine');
const logstash = require('../logstash');
const timestamp = require('../timestamp');
const helpers = require('./helpers');
const { MESSAGE } = require('triple-beam');
const TIMESTAMP = Symbol.for('timestamp');

describe('logstash', () => {
  it('default { @message, @fields } sets info[MESSAGE]', helpers.assumeFormatted(
    logstash(),
    { level: 'info', message: 'whatever' },
    (info, expected) => {
      assume(info.level).equals('info');
      assume(info.message).equals(undefined);
      assume(info[MESSAGE]).equals(JSON.stringify({
        '@message': expected.message,
        '@fields': {
          level: expected.level
        }
      }));
    }
  ));

  it('with timestamp { @message, @timestamp, @fields } sets info[MESSAGE]', helpers.assumeFormatted(
    combine(
      timestamp({ alias: TIMESTAMP }),
      logstash()
    ),
    { level: 'info', message: 'whatever' },
    (info, expected) => {
      assume(info.level).equals('info');
      assume(info.message).equals(undefined);
      assume(info[MESSAGE]).equals(JSON.stringify({
        '@message': expected.message,
        '@timestamp': info[TIMESTAMP],
        '@fields': {
          level: expected.level
        }
      }));
    }
  ));
});
