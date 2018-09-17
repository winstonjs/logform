'use strict';

const assume = require('assume');
const metadata = require('../metadata');
const helpers = require('./helpers');

describe('metadata', () => {
  const testInfoObject = {
    level: 'info',
    message: 'whatever',
    someKey: 'someValue',
    someObject: {
      key: 'value'
    }
  };

  it('metadata() (default) removes message and level and puts everything else into metadata', helpers.assumeFormatted(
    metadata(),
    testInfoObject,
    info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.metadata).is.a('object');
      assume(info.metadata.someKey).equals('someValue');
      assume(info.metadata.someObject).is.a('object');
      assume(info.metadata.someObject.key).equals('value');
    }
  ));

  it('metadata({ fillWith: [keys] }) only adds specified keys to the metadata object', helpers.assumeFormatted(
    metadata({ fillWith: ['level', 'someObject'] }),
    testInfoObject,
    info => {
      assume(info.metadata).is.a('object');
      assume(info.metadata.level).equals('info');
      assume(info.metadata.someObject.key).equals('value');
    }
  ));

  it('metadata({ fillExcept: [keys] }) fills all but the specified keys in the metadata object', helpers.assumeFormatted(
    metadata({ fillExcept: ['message', 'someObject'] }),
    testInfoObject,
    info => {
      assume(info.message).equals('whatever');
      assume(info.someObject).is.a('object');
      assume(info.someObject.key).equals('value');
      assume(info.metadata).is.a('object');
      assume(info.metadata.level).equals('info');
    }
  ));

  it('metadata({ fillWith: [keys], fillExcept: [keys] }) should only fillExcept the specified keys', helpers.assumeFormatted(
    metadata({ fillWith: ['message'], fillExcept: ['message'] }),
    testInfoObject,
    info => {
      assume(info.message).equals('whatever');
      assume(info.metadata.level).equals('info');
    }
  ));

  it('metadata({ key: someString }) should return an object with `someString` instead of `metadata` as the key',
    helpers.assumeFormatted(
      metadata({ fillWith: ['level', 'someKey'], key: 'myCustomKey' }),
      testInfoObject,
      info => {
        assume(info.myCustomKey).is.a('object');
        assume(info.message).equals('whatever');
        assume(info.myCustomKey.level).equals('info');
      }
    ));
});
