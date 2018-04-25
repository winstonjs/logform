'use strict';

const { MESSAGE } = require('triple-beam');

/*
 * function printf (templateFn)
 * Returns a new instance of the printf Format that creates an
 * intermediate prototype to store the template string-based formatter
 * function.
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
