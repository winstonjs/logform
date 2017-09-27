# logform

An mutable object format designed for chaining & objectMode streams.

## Usage

``` js
const { format } = require('logform');

const simpleColorized = format(
  format.colorize(),
  format.simple()
);
```

## Tests

Tests are written with `mocha`, `assume`, and `nyc`. They can be run with `npm`:

```
npm test
```

##### LICENSE: MIT
##### AUTHOR: [Charlie Robbins](https://github.com/indexzero)
