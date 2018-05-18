/* eslint no-unused-vars: 0 */
'use strict';

const { Signale } = require('signale');

class LogformSignale {
  constructor(opts = {}) {
    this.options = opts;
    this.signale = new Signale(this.options);
  }

  transform(info, opts) {
    const type = this.signale._types[info.level];
    info.message = this.signale._buildSignale(type, Object.assign({}, info, {
      prefix: info.label || ''
    }));

    return info;
  }
}

module.exports = opts => new LogformSignale(opts);

module.exports.LogformSignale
  = module.exports.Format
  = LogformSignale;
