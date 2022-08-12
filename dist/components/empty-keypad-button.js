'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
/**
 * A keypad button containing no symbols and triggering no actions on click.
 */

var React = require('react');

var _require = require('react-redux'),
    connect = _require.connect;

var GestureManager = require('./gesture-manager');
var KeyConfigs = require('../data/key-configs');
var KeypadButton = require('./keypad-button');

var EmptyKeypadButton = function (_React$Component) {
    _inherits(EmptyKeypadButton, _React$Component);

    function EmptyKeypadButton() {
        _classCallCheck(this, EmptyKeypadButton);

        return _possibleConstructorReturn(this, (EmptyKeypadButton.__proto__ || Object.getPrototypeOf(EmptyKeypadButton)).apply(this, arguments));
    }

    _createClass(EmptyKeypadButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                gestureManager = _props.gestureManager,
                rest = _objectWithoutProperties(_props, ['gestureManager']);

            // Register touch events on the button, but don't register its DOM node
            // or compute focus state or anything like that. We want the gesture
            // manager to know about touch events that start on empty buttons, but
            // we don't need it to know about their DOM nodes, as it doesn't need
            // to focus them or trigger presses.


            return React.createElement(KeypadButton, _extends({
                onTouchStart: function onTouchStart(evt) {
                    return gestureManager.onTouchStart(evt);
                },
                onTouchEnd: function onTouchEnd(evt) {
                    return gestureManager.onTouchEnd(evt);
                },
                onTouchMove: function onTouchMove(evt) {
                    return gestureManager.onTouchMove(evt);
                },
                onTouchCancel: function onTouchCancel(evt) {
                    return gestureManager.onTouchCancel(evt);
                }
            }, KeyConfigs.NOOP, rest));
        }
    }]);

    return EmptyKeypadButton;
}(React.Component);

EmptyKeypadButton.propTypes = {
    gestureManager: PropTypes.instanceOf(GestureManager)
};


var mapStateToProps = function mapStateToProps(state) {
    var gestures = state.gestures;

    return {
        gestureManager: gestures.gestureManager
    };
};

module.exports = connect(mapStateToProps)(EmptyKeypadButton);