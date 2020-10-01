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

/*
 * @api private
 * method {function} exposeFormat
 * Exposes a sub-format on the main format object
 * as a lazy-loaded getter.
 */
function exposeFormat(name, requiredFormat) {
  Object.defineProperty(format, name, {
    get() {
      return requiredFormat;
    },
    configurable: true
  });
}

//
// Setup all transports as lazy-loaded getters.
//
exposeFormat('align', require('./align'));
exposeFormat('errors', require('./errors'));
exposeFormat('cli', require('./cli'));
exposeFormat('combine', require('./combine'));
exposeFormat('colorize', require('./colorize'));
exposeFormat('json', require('./json'));
exposeFormat('label', require('./label'));
exposeFormat('logstash', require('./logstash'));
exposeFormat('metadata', require('./metadata'));
exposeFormat('ms', require('./ms'));
exposeFormat('padLevels', require('./pad-levels'));
exposeFormat('prettyPrint', require('./pretty-print'));
exposeFormat('printf', require('./printf'));
exposeFormat('simple', require('./simple'));
exposeFormat('splat', require('./splat'));
exposeFormat('timestamp', require('./timestamp'));
exposeFormat('uncolorize', require('./uncolorize'));
