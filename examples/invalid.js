const { format } = require('../');

const invalid = format(function invalid(just, too, many, args) {
  return just;
});
