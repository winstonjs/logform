'use strict';

const assume = require('assume');
const logform = {
  node: require('../index'),
  browser: require('../browser')
};

const transpiled = {
  node: require('../dist/index'),
  browser: require('../dist/browser')
};

const expectedFormats = [
  'align',
  'cli',
  'combine',
  'colorize',
  'json',
  'label',
  'logstash',
  'metadata',
  'padLevels',
  'prettyPrint',
  'printf',
  'simple',
  'splat',
  'timestamp',
  'uncolorize'
];

/**
 * Assets the basic exposed exports for a given `obj`
 * @param  {Object} obj Exports from ./{index,browser}.js
 * @returns {Function} Assertion function for `describe`
 */
function assumeLogform(obj) {
  return () => {
    it('exposes format as a function', () => {
      assume(obj.format).is.a('function');
    });

    it('exposes levels as a function', () => {
      assume(obj.levels).is.a('function');
    });

    expectedFormats.forEach(fmt => {
      it(`exposes ${fmt} as a function`, () => {
        assume(obj.format[fmt]).is.a('function');
      });
    });
  };
}

describe('logform (node)', assumeLogform(logform.node));
describe('logform (browser)', assumeLogform(logform.browser));

describe('logform (node, transpiled)', assumeLogform(transpiled.node));
describe('logform (browser, transpiled)', assumeLogform(transpiled.browser));
