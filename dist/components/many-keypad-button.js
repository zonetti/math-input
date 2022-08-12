'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
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

var ManyKeypadButton = function (_React$Component) {
    _inherits(ManyKeypadButton, _React$Component);

    function ManyKeypadButton() {
        _classCallCheck(this, ManyKeypadButton);

        return _possibleConstructorReturn(this, (ManyKeypadButton.__proto__ || Object.getPrototypeOf(ManyKeypadButton)).apply(this, arguments));
    }

    _createClass(ManyKeypadButton, [{
        key: 'render',
        value: function render() {
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
    }]);

    return ManyKeypadButton;
}(React.Component);

ManyKeypadButton.propTypes = {
    keys: PropTypes.arrayOf(keyIdPropType).isRequired
};


module.exports = ManyKeypadButton;