'use strict';

const colors = require('colors/safe');
const format = require('./format');

//
// Fix colors not appearing in non-tty environments
//
colors.enabled = true;

/**
 * @property {RegExp} hasSpace
 * Simple regex to check for presence of spaces.
 */
const hasSpace = /\s+/;

/*
 * function colorize (opts)
 * Returns a new instance of the CLI format TransformStream
 * with applies level colors to `info` objects.
 */
module.exports = function createColorize(opts) {
  return new Colorizer(opts);
};

/*
 * function setupColors(opts)
 * Attaches a Colorizer instance to the format.
 */
function Colorizer(opts) {
  opts = opts || {};
  if (!opts.colors) {
    throw new Error('Cannot create colorize format: missing { colors } in options.');
  }

  this.options = opts;
  this.addColors(opts.colors);
}

/**
 * Adds the colors Object to the set of allColors
 * known by winston
 *
 * @param {Object} colors Set of color mappings to add.
 */
Colorizer.prototype.addColors = function addColors(colors) {
  this.allColors = this.allColors || {};
  Object.assign(this.allColors, colors);

  //
  // Eagerly set any colors that happen to be `/s`
  // separated strings into an Array to be used later.
  //
  Object.keys(this.allColors).forEach(level => {
    if (hasSpace.test(this.allColors[level])) {
      this.allColors[level] = this.allColors[level].split(hasSpace);
    }
  });
};

/*
 * function colorize (level, message)
 * Performs multi-step colorization using colors/safe
 */
Colorizer.prototype.colorize = function colorize(level, message) {
  if (typeof message === 'undefined') {
    message = level;
  }

  //
  // If the color for the level is just a string
  // then attempt to colorize the message with it.
  //
  if (!Array.isArray(this.allColors[level])) {
    return colors[this.allColors[level]](message);
  }

  //
  // If it is an Array then iterate over that Array, applying
  // the colors function for each item.
  //
  for (var i = 0, len = this.allColors[level].length; i < len; i++) {
    message = this.colors[allColors[level][i]](message);
  }

  return message;
};

/*
 * function transform (info, opts)
 * Attempts to colorize the { level, message } of the given
 * `logform` info object.
 */
Colorizer.prototype.transform = function transform(info, opts) {
  var level = info.level;

  if (opts.level || opts.all || !opts.message) {
    info.level = this.colorize(level);
  }

  if (opts.all || opts.message) {
    info.message = this.colorize(level, info.message);
  }

  return info;
};

