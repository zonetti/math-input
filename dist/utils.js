'use strict';

var _require = require('./consts'),
    DecimalSeparators = _require.DecimalSeparators;

var icu = require('./lib/icu-slim');

// We expect `window.icu` to be exposed by the parent. When in doubt, we fall
// back to a period. We can only depend on a subset of what localeplanet
// provides, however -- the things in `icu-slim.js` (there's a copy in ../lib/
// for reference).
var decimalSeparator = void 0;

if (icu.getDecimalFormatSymbols().decimal_separator === ',') {
    decimalSeparator = DecimalSeparators.COMMA;
} else {
    decimalSeparator = DecimalSeparators.PERIOD;
}

module.exports = {
    decimalSeparator: decimalSeparator
};