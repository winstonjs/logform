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

## Understanding formats

Every format accepts the following 

## `info` Objects

The `info` parameter provided to a given format represents a single log message. The object itself is mutable. `logform` itself exposes several properties  which means community formats could add 



## Tests

Tests are written with `mocha`, `assume`, and `nyc`. They can be run with `npm`:

```
npm test
```

##### LICENSE: MIT
##### AUTHOR: [Charlie Robbins](https://github.com/indexzero)
