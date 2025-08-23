'use strict';

const format = require('./format');
const { MESSAGE } = require('triple-beam');
const jsonStringify = require('safe-stable-stringify');

/*
 * function logstash (info)
 * Returns a new instance of the LogStash Format that turns a
 * log `info` object into pure JSON with the appropriate logstash
 * options. This was previously exposed as { logstash: true }
 * to transports in `winston < 3.0.0`.
 */
module.exports = format(info => {
  const { message, timestamp, ...fields } = info;
  const logstash = { '@fields': fields };

  if (message) {
    logstash['@message'] = message;
  }

  if (timestamp) {
    logstash['@timestamp'] = timestamp;
  }

  info[MESSAGE] = jsonStringify(logstash);
  return info;
});
