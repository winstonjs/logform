const levels = require('../../levels');

exports.cli    = levels(require('./cli'));
exports.npm    = levels(require('./npm'));
exports.syslog = levels(require('./syslog'));

