'use strict';

/**
 * @api public
 * @property {function} format
 * Both the construction method and set of exposed
 * formats.
 */
const format = exports.format = require('./format');

/**
 * @api public
 * @method {function} levels
 * Registers the specified levels with logform.
 */
const levels = exports.levels = require('./levels');

//
// Setup all transports as lazy-loaded getters.
//
Object.defineProperty(format, 'cli', {
  get: function () {
    return require('./cli');
  }
});

Object.defineProperty(format, 'colorize', {
  get: function () {
    return require('./colorize');
  }
});

Object.defineProperty(format, 'json', {
  get: function () {
    return require('./json');
  }
});

Object.defineProperty(format, 'logstash', {
  get: function () {
    return require('./logstash');
  }
});

Object.defineProperty(format, 'padLevels', {
  get: function () {
    return require('./pad-levels');
  }
});

Object.defineProperty(format, 'prettyPrint', {
  get: function () {
    return require('./pretty-print');
  }
});

Object.defineProperty(format, 'simple', {
  get: function () {
    return require('./simple');
  }
});

Object.defineProperty(format, 'splat', {
  get: function () {
    return require('./splat');
  }
});

Object.defineProperty(format, 'uncolorize', {
  get: function () {
    return require('./uncolorize');
  }
});
