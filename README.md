# logform

An mutable object-based log format designed for chaining & objectMode streams.

## Usage

``` js
const { format } = require('logform');

const alignedWithColorsAndTime = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(info => `${info.timestamp} ${info.level}: ${message}`)
);
```

## `info` Objects

The `info` parameter provided to a given format represents a single log message. The object itself is mutable. Every `info` must have at least the `level` and `message` properties:

``` js
{
  level: 'info',                 // Level of the logging message  
  message: 'Hey! Log something?' // Descriptive message being logged.
}
```

`logform` itself exposes several additional properties:

- `splat`: string interpolation splat for `%d %s`-style messages.
- `timestamp`: timestamp the message was received.
- `label`: custom label associated with each message.

As a consumer you may add whatever properties you wish – _internal state is maintained by `Symbol` properties._

## Understanding formats

Each format is designed to be as simple as possible. They may be combined with `format.combined`. To define a new format simple pass it a function:

```
const { format } = require('logform');

const volume = format((info, opts) => {
  if (opts.yell) {
    info.message = info.message.toUpperCase(); 
  } else if (opts.whisper) {
    info.message = info.message.toLowerCase();
  }

  return info;
});

// `volume` is now a function that returns instances of the format.
const scream = volume({ yell: true });
console.dir({ 
  level: 'info', 
  message: `sorry for making you yell in your head!` 
});

// {
//   level: 'info'
//   message: 'SORRY FOR MAKING YOU YELL IN YOUR HEAD!'
// }
```

## Tests

Tests are written with `mocha`, `assume`, and `nyc`. They can be run with `npm`:

```
npm test
```

##### LICENSE: MIT
##### AUTHOR: [Charlie Robbins](https://github.com/indexzero)
