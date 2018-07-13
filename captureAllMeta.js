'use strict';

const { SPLAT } = require('triple-beam');

class CaptureAllMeta {
  constructor(opts) {
    this.options = opts;
  }

  /**
     * Transforms the `info` object by adding info[meta] from any
     * unused info[SPLAT] items.
     *
     * @param  {Info} info Logform info message.
     * @param  {Object} opts Options for this instance.
     * @returns {Info} Modified info message
     */
  transform(info) {
    const splat = info[SPLAT] || [];

    if (Array.isArray(splat)) {

      info.meta = splat;
    } else {
      info.meta = [];
      info.meta[0] = splat;
    }

    // console.log('with meta...', JSON.stringify(info));
    return info;
  }

}


/*
 * function captureAllMeta (info)
 * Returns a new instance of the splat format TransformStream
 * which moves all splat to info[meta] object.
 */
module.exports = opts => new CaptureAllMeta(opts);
