'use strict';

const { SPLAT } = require('triple-beam');
const format = require('./format');
const jsonStringify = require('fast-safe-stringify');

/**
   * Transforms the `info` object by adding info[meta] from any
   * unused info[SPLAT] items.
   *
   * @param  {Info} info Logform info message.
   * @param  {Object} opts Options for this instance.
   * @returns {Info} Modified info message
   */

module.exports = format((info, { messageSplatDelimeter = ' ', innerSplatDelimeter = ', ' }) => {
  // not including info.splat here because if the user takes the hot path
  // they will most likely not (aka shouldn't) include additional objects inside splat
  const splat = info[SPLAT] || [];

  // if no splat, return
  if ((!splat.length)) {
    return info;

  }

  let splatStringified = '';
  info[SPLAT].forEach(function (el, idx) {
    // add delimeter before al elements after the first
    if (idx !== 0) {
      splatStringified += innerSplatDelimeter;
    }
    // we can even parse for errors
    if (el instanceof Error) {
      splatStringified += `${el.stack}`;
    } else if (typeof el === 'object') {
      // standard string/array objects
      splatStringified += jsonStringify(el);
    } else {
      // strings, numbers, etc
      splatStringified += el;
    }

  });
  info.message = `${info.message}${messageSplatDelimeter}${splatStringified}`;
  delete info[SPLAT];
  return info;


});


