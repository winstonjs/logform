'use strict';

const assume = require('assume');
const combine = require('../lib/combine');
const logstash = require('../lib/logstash');
const timestamp = require('../lib/timestamp');
const helpers = require('./helpers');
const { MESSAGE } = require('triple-beam');
const TIMESTAMP = Symbol.for('timestamp');

describe('logstash', function () {
  it('default { @message, @fields } sets info[MESSAGE]', helpers.assumeFormatted(
    logstash(),
    { level: 'info', message: 'whatever' },
    function (info, expected) {
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
    function (info, expected) {
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
