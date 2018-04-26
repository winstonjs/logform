const format = require('./format');

const fillExcept = (info, fillExceptKeys, metadataKey) => {
  const savedKeys = {};
  const metadata = {};

  fillExceptKeys.forEach((key) => {
    savedKeys[key] = info[key];
    delete info[key];
  });
  Object.keys(info).forEach((key) => {
    metadata[key] = info[key];
    delete info[key];
  });
  Object.assign(info, savedKeys, { [metadataKey]: metadata });
  return info;
};

const fillWith = (info, fillWithKeys, metadataKey) => {
  const metadata = {};
  fillWithKeys.forEach((key) => {
    metadata[key] = info[key];
    delete info[key];
  });
  info[metadataKey] = metadata;
  return info;
};

/**
 * Adds in a "metadata" object to collect extraneous data, similar to the metadata
 * object in winston 2.x.
 */
module.exports = format(function (info, opts = {}) {
  let metadataKey = 'metadata';
  let fillExceptKeys = [];

  if (opts.key) {
    metadataKey = opts.key;
  }

  if (!opts.fillExcept && !opts.fillWith) {
    fillExceptKeys.push('level');
    fillExceptKeys.push('message');
  }

  if (opts.fillExcept) {
    fillExceptKeys = opts.fillExcept;
  }

  if (fillExceptKeys.length > 0) {
    return fillExcept(info, fillExceptKeys, metadataKey);
  }

  if (opts.fillWith) {
    return fillWith(info, opts.fillWith, metadataKey);
  }

  return info;
});
