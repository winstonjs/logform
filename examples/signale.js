/* eslint-disable no-console */
'use strict';

const { format } = require('../');
const { signale } = format;

const logformSignale = signale({
  scope: 'custom',
  config: {
    displayTimestamp: true,
    displayDate: true
  },
  types: {
    remind: {
      badge: '**',
      color: 'yellow',
      label: 'reminder'
    },
    santa: {
      badge: '🎅',
      color: 'red',
      label: 'santa'
    }
  }
})

const info = logformSignale.transform({
  level: 'info',
  message: 'foo',
  label: 'prefix'
});
const remind = logformSignale.transform({
  level: 'remind',
  message: 'bar'
});
const santa = logformSignale.transform({
  level: 'santa',
  message: 'baz'
});

console.log(info.message);
console.log(remind.message);
console.log(santa.message);
