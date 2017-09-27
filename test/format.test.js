/*
 * logform.format.test.js: Tests for logform.format
 *
 * (C) 2015 Charlie Robbins
 * MIT LICENSE
 *
 */

const assume = require('assume');
const logform = require('../index');

describe('{ format }', function () {
  it('has the expected default logform.formats', function () {
    assume(logform.format).is.a('function');
    assume(logform.format.cli).is.a('function');
    assume(logform.format.colorize).is.a('function');
    assume(logform.format.json).is.a('function');
    assume(logform.format.logstash).is.a('function');
    assume(logform.format.padLevels).is.a('function');
    assume(logform.format.prettyPrint).is.a('function');
    assume(logform.format.splat).is.a('function');
    assume(logform.format.simple).is.a('function');
    assume(logform.format.uncolorize).is.a('function');
  });
});
