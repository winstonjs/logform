'use strict';

const assume = require('assume');
const align = require('../align');
const { LEVEL, MESSAGE } = require('triple-beam');

// Model a viewer's tab stops for ASCII text, using zero-based columns.
function messageColumn(line, tabWidth) {
  return Array.from(line.slice(0, line.indexOf('message'))).reduce(
    (column, char) => char === '\t'
      ? column + tabWidth - column % tabWidth
      : column + 1,
    0
  );
}

describe('align', () => {
  it('prepends a tab without changing the level or metadata', () => {
    const fmt = align();
    const info = { level: 'info', [LEVEL]: 'info', message: 'message', requestId: 42 };
    const actual = fmt.transform(info, fmt.options);

    assume(actual).equals(info);
    assume(actual.message).equals('\tmessage');
    assume(actual.level).equals('info');
    assume(actual[LEVEL]).equals('info');
    assume(actual.requestId).equals(42);
  });

  it('coerces non-string messages using template interpolation', () => {
    const fmt = align();
    [42, null, undefined, { key: 'value' }].forEach(message => {
      const actual = fmt.transform({ level: 'info', message }, fmt.options);
      assume(actual.message).equals(`\t${message}`);
    });
  });

  it('depends on the prefix and viewer tab width when combined with simple', () => {
    const { format } = require('../');
    const fmt = format.combine(align(), format.simple());
    const lines = ['info', 'verbose', 'really-really-long'].map(level => {
      return fmt.transform({ level, [LEVEL]: level, message: 'message' })[MESSAGE];
    });

    assume(lines).deep.equals([
      'info: \tmessage',
      'verbose: \tmessage',
      'really-really-long: \tmessage'
    ]);
    assume(lines.map(line => messageColumn(line, 4))).deep.equals([8, 12, 24]);
    assume(lines.map(line => messageColumn(line, 8))).deep.equals([8, 16, 24]);
  });
});
