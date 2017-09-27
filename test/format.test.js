/*
 * logform.test.js: Tests for logform
 *
 * (C) 2015 Charlie Robbins
 * MIT LICENSE
 *
 */

const assume = require('assume');
const logform = require('../index');

describe('logform', function () {
  it('has the expected default logforms', function () {
    assume(logform).is.a('function');
    assume(logform.cli).is.a('function');
    assume(logform.colorize).is.a('function');
    assume(logform.json).is.a('function');
    assume(logform.logstash).is.a('function');
    assume(logform.padLevels).is.a('function');
    assume(logform.prettyPrint).is.a('function');
    assume(logform.splat).is.a('function');
    assume(logform.simple).is.a('function');
    assume(logform.uncolorize).is.a('function');
  });
});
