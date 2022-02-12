'use strict';

const assume = require('assume');
const json = require('../json');
const jsonStringify = require('safe-stable-stringify');
const { assumeFormatted, assumeHasPrototype, writable } = require('./helpers');
const { MESSAGE } = require('triple-beam');

describe('json', () => {
  it('json() (default) sets info[MESSAGE]', assumeFormatted(
    json(),
    { level: 'info', message: 'whatever' },
    (info, expected) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('whatever');

      const raw = JSON.stringify(expected);
      assume(info[MESSAGE]).equals(raw);
      assume(JSON.stringify(info)).equals(raw);
    }
  ));

  it('json({ space: 2 }) sets info[MESSAGE]', assumeFormatted(
    json({ space: 2 }),
    { level: 'info', message: '2 spaces 4 lyfe' },
    (info, expected) => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.level).equals('info');
      assume(info.message).equals('2 spaces 4 lyfe');
      assume(info[MESSAGE]).equals(JSON.stringify(expected, null, 2));
    }
  ));

  it('json({ replacer }) sets info[MESSAGE]', assumeFormatted(
    json({
      replacer: function onlyLevelAndMessage(key, value) {
        if (key === 'filtered') { return undefined; }
        return value;
      }
    }),
    { level: 'info', message: 'replacer', filtered: true },
    info => {
      const { level, message } = info;
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.filtered).equals(true);
      assume(info.level).equals('info');
      assume(info.message).equals('replacer');
      assume(info[MESSAGE]).equals(JSON.stringify({ level, message }));
    }
  ));

  it('json() can handle circular JSON objects', (done) => {
    // Define an info with a circular reference.
    const circular = { level: 'info', message: 'has a circular ref ok!', filtered: true };
    circular.self = { circular };

    const fmt = json();
    const stream = writable(info => {
      assume(info.level).is.a('string');
      assume(info.message).is.a('string');
      assume(info.filtered).equals(true);
      assume(info.level).equals('info');
      assume(info.message).equals('has a circular ref ok!');
      assume(info.self.circular).equals(circular);
      assume(info[MESSAGE]).equals(jsonStringify(circular));
      done();
    });

    stream.write(fmt.transform(circular, fmt.options));
  });

  // https://nodejs.org/api/buffer.html#buftojson
  it('json() can handle Buffers', assumeFormatted(
    json(),
    { level: 'info', message: 'has a buffer!', buf: Buffer.from('foo') },
    (info) => {
      assume(info.level).is.a('string');
      assume(info.level).equals('info');

      const parsed = JSON.parse(info[MESSAGE]);
      assume(parsed).deep.equal({
        level: 'info',
        message: 'has a buffer!',
        buf: {
          type: 'Buffer',
          data: [102, 111, 111]
        }
      });
    }
  ));

  it('json() can handle BigInt', assumeFormatted(
    json(),
    // the ESLint env target we're on doesn't understand BigInt
    // eslint-disable-next-line
    { level: 'info', message: 'has a BigInt!', howBig: BigInt(9007199254740991) },
    (info) => {
      assume(info.level).is.a('string');
      assume(info.level).equals('info');

      const parsed = JSON.parse(info[MESSAGE]);
      assume(parsed).deep.equal({
        level: 'info',
        message: 'has a BigInt!',
        howBig: '9007199254740991'
      });
    }
  ));

  it('json() can pass safe-stable-stringify options', assumeFormatted(
    json({ maximumDepth: 1 }),
    { level: 'info', message: 'has a BigInt!', nested: { foo: 'bar' }},
    (info) => {
      assume(info.level).is.a('string');
      assume(info.level).equals('info');

      const parsed = JSON.parse(info[MESSAGE]);
      assume(parsed).deep.equal({
        level: 'info',
        message: 'has a BigInt!',
        nested: '[Object]'
      });
    }
  ));

  it('exposes the Format prototype', assumeHasPrototype(json));
});
