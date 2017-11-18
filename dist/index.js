'use strict';

/**
 * A single entry-point for all of the external-facing functionality.
 */

var components = {
    Keypad: require('./components/provided-keypad'),
    KeypadInput: require('./components/input/math-input')
};

var _require = require('./consts'),
    KeypadTypes = _require.KeypadTypes;

var consts = { KeypadTypes: KeypadTypes };

var _require2 = require('./components/prop-types'),
    keypadConfigurationPropType = _require2.keypadConfigurationPropType,
    keypadElementPropType = _require2.keypadElementPropType;

var propTypes = { keypadConfigurationPropType: keypadConfigurationPropType, keypadElementPropType: keypadElementPropType };

module.exports = {
    components: components,
    consts: consts,
    propTypes: propTypes
};