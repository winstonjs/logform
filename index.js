'use strict';

/*
 * @api public
 * @property {function} format
 * Both the construction method and set of exposed
 * formats.
 */
const format = exports.format = require('./format');

/*
 * @api public
 * @method {function} levels
 * Registers the specified levels with logform.
 */
exports.levels = require('./levels');


Object.defineProperty(format, 'align', {
  get() {
    return require('./align');
  },
  configurable: true
});

Object.defineProperty(format, 'errors', {
  get() {
    return require('./errors');
  },
  configurable: true
});

Object.defineProperty(format, 'cli', {
  get() {
    return require('./cli');
  },
  configurable: true
});

Object.defineProperty(format, 'combine', {
  get() {
    return require('./combine');
  },
  configurable: true
});

Object.defineProperty(format, 'colorize', {
  get() {
    return require('./colorize');
  },
  configurable: true
});

Object.defineProperty(format, 'json', {
  get() {
    return require('./json');
  },
  configurable: true
});

Object.defineProperty(format, 'label', {
  get() {
    return require('./label');
  },
  configurable: true
});

Object.defineProperty(format, 'logstash', {
  get() {
    return require('./logstash');
  },
  configurable: true
});

Object.defineProperty(format, 'metadata', {
  get() {
    return require('./metadata');
  },
  configurable: true
});

Object.defineProperty(format, 'ms', {
  get() {
    return require('./ms');
  },
  configurable: true
});

Object.defineProperty(format, 'padLevels', {
  get() {
    return require('./pad-levels');
  },
  configurable: true
});

Object.defineProperty(format, 'prettyPrint', {
  get() {
    return require('./pretty-print');
  },
  configurable: true
});

Object.defineProperty(format, 'printf', {
  get() {
    return require('./printf');
  },
  configurable: true
});

Object.defineProperty(format, 'simple', {
  get() {
    return require('./simple');
  },
  configurable: true
});

Object.defineProperty(format, 'splat', {
  get() {
    return require('./splat');
  },
  configurable: true
});

Object.defineProperty(format, 'timestamp' ,{
  get() {
    return require('./timestamp');
  },
  configurable: true
});

Object.defineProperty(format, 'uncolorize', {
  get() {
    return require('./uncolorize');
  },
  configurable: true
});