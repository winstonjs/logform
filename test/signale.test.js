'use strict';

const assume = require('assume');
const helpers = require('./helpers');
const signale = require('../signale');
const { MESSAGE } = require('triple-beam');
const types = {
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
};

describe('signale', () => {
  it('signale({ types }) transforms to signale format with default types', helpers.assumeFormatted(
    signale(),
    { level: 'info', message: 'interop with signale!' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).contains('interop with signale!');
      assume(info[MESSAGE]).equals(undefined);
    }
  ));

  it('signale({ types }) transforms to signale format with custom types', helpers.assumeFormatted(
    signale({ types }),
    { level: 'remind', message: 'interop with signale!' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('remind');
      assume(info.message).contains('interop with signale!');
      assume(info[MESSAGE]).equals(undefined);
    }
  ));

  it('signale({ types, scope }) transforms to signale format with custom types and scope', helpers.assumeFormatted(
    signale({ types, scope: 'custom' }),
    { level: 'santa', message: 'interop with signale!' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('santa');
      assume(info.message).contains('interop with signale!');
      assume(info.message).contains('custom');
      assume(info[MESSAGE]).equals(undefined);
    }
  ));

  it('signale({ types, config }) transforms to signale format with a custom config', helpers.assumeFormatted(
    signale({
      types,
      config: {
        displayTimestamp: true,
        displayDate: true
      }
    }),
    { level: 'info', message: 'interop with signale!' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).contains('interop with signale!');
      assume(info.message).matches(/\[\d{4,}-\d{1,}-\d{2,}\].*\[\d{2,}:\d{2,}:\d{2,}\]/);
      assume(info[MESSAGE]).equals(undefined);
    }
  ));

  it('signale({ types }) transforms to signale format with custom types and a label', helpers.assumeFormatted(
    signale({ types }),
    { level: 'info', message: 'interop with signale!', label: 'prefix' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).contains('interop with signale!');
      assume(info.message).contains('prefix');
      assume(info[MESSAGE]).equals(undefined);
    }
  ));
});

it('exposes the Format prototype', helpers.assumeHasPrototype(signale));
