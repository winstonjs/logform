'use strict';

const assume = require('assume');
const label = require('../label');
const helpers = require('./helpers');
const { MESSAGE } = require('triple-beam');

describe('label', () => {
  it('label({ label }) set the label to info.label', helpers.assumeFormatted(
    label({ label: 'wow such impress' }),
    { level: 'info', message: 'label all the things' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.label).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('label all the things');
      assume(info.label).equals('wow such impress');
      assume(info[MESSAGE]).equals(undefined);
    }
  ));

  it('label({ label, message }) adds the label to info.message', helpers.assumeFormatted(
    label({ label: 'wow such impress', message: true }),
    { level: 'info', message: 'label all the things' },
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('[wow such impress] label all the things');
      assume(info[MESSAGE]).equals(undefined);
    }
  ));
});
