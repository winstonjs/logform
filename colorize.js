'use strict';

const colors = require('colors/safe');

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
 * function colorize (info)
 * Returns a new instance of the colorize Format that applies
 * level colors to `info` objects. This was previously exposed
 * as { colorize: true } to transports in `winston < 3.0.0`.
 */
module.exports = function createColorize(opts) {
  return new Colorizer(opts);
};

//
// Attach the Colorizer for registration purposes
//
module.exports.Colorizer
  = module.exports.Format
  = Colorizer;

/*
 * function setupColors(info)
 * Attaches a Colorizer instance to the format.
 */
function Colorizer(opts) {
  opts = opts || {};
  if (opts.colors) {
    this.addColors(opts.colors);
  }

  this.options = opts;
}

/*
 * Adds the colors Object to the set of allColors
 * known by the Colorizer
 *
 * @param {Object} colors Set of color mappings to add.
 */
Colorizer.addColors = function (colors) {
  const nextColors = Object.keys(colors).reduce((acc, level) => {
    acc[level] = hasSpace.test(colors[level])
      ? colors[level].split(hasSpace)
      : colors[level];

    return acc;
  }, {});

  Colorizer.allColors = Object.assign({}, Colorizer.allColors || {}, nextColors);
  return Colorizer.allColors;
};

/*
 * Adds the colors Object to the set of allColors
 * known by the Colorizer
 *
 * @param {Object} colors Set of color mappings to add.
 */
Colorizer.prototype.addColors = function addColors(colors) {
  return Colorizer.addColors(colors);
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
  if (!Array.isArray(Colorizer.allColors[level])) {
    return colors[Colorizer.allColors[level]](message);
  }

  //
  // If it is an Array then iterate over that Array, applying
  // the colors function for each item.
  //
  for (var i = 0, len = Colorizer.allColors[level].length; i < len; i++) {
    message = colors[Colorizer.allColors[level][i]](message);
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

