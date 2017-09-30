'use strict';

const MESSAGE = Symbol.for('message');

/*
 * function printf (templateFn)
 * Returns a new instance of the printf Format that creates an
 * intermediate prototype to store the
 * level colors to `info` objects. This was previously exposed
 * as { colorize: true } to transports in `winston < 3.0.0`.
 */
module.exports = function createPrintf(templateFn) {
  function Printf() {}
  Printf.prototype.template = templateFn;
  Printf.prototype.transform = function (info) {
    info[MESSAGE] = this.template(info);
    return info;
  };

  const format = new Printf();
  format.Format = Printf;
  return format;
};
