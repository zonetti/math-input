'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * A keypad button that displays an arbitrary number of symbols, with no
 * 'default' symbol.
 */

var React = require('react');

var EmptyKeypadButton = require('./empty-keypad-button');
var TouchableKeypadButton = require('./touchable-keypad-button');

var Keys = require('../data/keys');
var KeyConfigs = require('../data/key-configs');

var _require = require('../consts'),
    KeyTypes = _require.KeyTypes;

var _require2 = require('./prop-types'),
    keyIdPropType = _require2.keyIdPropType;

var ManyKeypadButton = React.createClass({
    displayName: 'ManyKeypadButton',

    propTypes: {
        keys: React.PropTypes.arrayOf(keyIdPropType).isRequired
    },

    render: function render() {
        var _props = this.props,
            keys = _props.keys,
            rest = _objectWithoutProperties(_props, ['keys']);

        // If we have no extra symbols, render an empty button. If we have just
        // one, render a standard button. Otherwise, capture them all in a
        // single button.


        if (keys.length === 0) {
            return React.createElement(EmptyKeypadButton, rest);
        } else if (keys.length === 1) {
            var keyConfig = KeyConfigs[keys[0]];
            return React.createElement(TouchableKeypadButton, _extends({ keyConfig: keyConfig }, rest));
        } else {
            var _keyConfig = {
                id: Keys.MANY,
                type: KeyTypes.MANY,
                childKeyIds: keys
            };
            return React.createElement(TouchableKeypadButton, _extends({ keyConfig: _keyConfig }, rest));
        }
    }
});

module.exports = ManyKeypadButton;