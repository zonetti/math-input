'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * A keypad button containing no symbols and triggering no actions on click.
 */

var React = require('react');

var _require = require('react-redux'),
    connect = _require.connect;

var GestureManager = require('./gesture-manager');
var KeyConfigs = require('../data/key-configs');
var KeypadButton = require('./keypad-button');

var EmptyKeypadButton = React.createClass({
    displayName: 'EmptyKeypadButton',

    propTypes: {
        gestureManager: React.PropTypes.instanceOf(GestureManager)
    },

    render: function render() {
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
});

var mapStateToProps = function mapStateToProps(state) {
    var gestures = state.gestures;

    return {
        gestureManager: gestures.gestureManager
    };
};

module.exports = connect(mapStateToProps)(EmptyKeypadButton);