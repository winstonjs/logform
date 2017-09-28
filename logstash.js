'use strict';

const format = require('./format');

/*
 * function logstash (opts)
 * Returns a new instance of the LogStash Format that turns a
 * log `info` object into pure JSON with the appropriate logstash
 * options. This was previously exposed as { logstash: true }
 * to transports in `winston < 3.0.0`.
 */
module.exports = format(function (info, opts) {
  var logstash = {};
  if (!!info.message) {
    logstash['@message'] = info.message;
    delete info.message;
  }

  if (!!info.timestamp) {
    logstash['@timestamp'] = info.timestamp;
    delete info.timestamp;
  }

  logstash['@fields'] = info;
  info.raw = JSON.stringify(logstash);
  return info;
});
