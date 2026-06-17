/* eslint-disable no-process-env */
'use strict';

class EnvManager {
  constructor(
    opts = {}
  ) {
    if (opts.disableColor === undefined) {
      opts.disableColor = process.env.NO_COLOR &&
        process.env.NO_COLOR !== '0' &&
        process.env.NO_COLOR !== 'false';
    }

    this.opts = opts;
  }

  get isColorDisabled() {
    return this.opts.disableColor;
  }
}

module.exports.EnvManager = EnvManager;
