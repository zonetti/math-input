'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PropTypes = require('prop-types');
/**
 * A touchable wrapper around the base KeypadButton component. This button is
 * responsible for keeping our button ID system (which will be used to handle
 * touch events globally) opaque to the KeypadButton.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var _require = require('react-redux'),
    connect = _require.connect;

var _require2 = require('aphrodite'),
    StyleSheet = _require2.StyleSheet;

var KeypadButton = require('./keypad-button');
var KeyConfigs = require('../data/key-configs');
var GestureManager = require('./gesture-manager');

var _require3 = require('./prop-types'),
    bordersPropType = _require3.bordersPropType,
    keyIdPropType = _require3.keyIdPropType;

var _require4 = require('../consts'),
    KeyTypes = _require4.KeyTypes;

var TouchableKeypadButton = React.createClass({
    displayName: 'TouchableKeypadButton',

    propTypes: {
        borders: bordersPropType,
        childKeyIds: PropTypes.arrayOf(keyIdPropType),
        disabled: PropTypes.bool,
        focused: PropTypes.bool,
        gestureManager: PropTypes.instanceOf(GestureManager),
        id: keyIdPropType.isRequired,
        popoverEnabled: PropTypes.bool,
        style: PropTypes.any,
        type: PropTypes.oneOf(Object.keys(KeyTypes)).isRequired
    },

    shouldComponentUpdate: function shouldComponentUpdate(newProps) {
        // We take advantage of a few different properties of our key
        // configuration system. Namely, we know that the other props flow
        // directly from the ID, and thus don't need to be checked. If a key has
        // a custom style, we bail out (this should be rare).
        return newProps.id !== this.props.id || newProps.gestureManager !== this.props.gestureManager || newProps.focused !== this.props.focused || newProps.disabled !== this.props.disabled || newProps.popoverEnabled !== this.props.popoverEnabled || newProps.type !== this.props.type || !!newProps.style;
    },
    componentWillUnmount: function componentWillUnmount() {
        var _props = this.props,
            gestureManager = _props.gestureManager,
            id = _props.id;

        gestureManager.unregisterDOMNode(id);
    },
    render: function render() {
        var _props2 = this.props,
            borders = _props2.borders,
            childKeyIds = _props2.childKeyIds,
            disabled = _props2.disabled,
            gestureManager = _props2.gestureManager,
            id = _props2.id,
            style = _props2.style,
            rest = _objectWithoutProperties(_props2, ['borders', 'childKeyIds', 'disabled', 'gestureManager', 'id', 'style']);

        // Only bind the relevant event handlers if the key is enabled.


        var eventHandlers = disabled ? {
            onTouchStart: function onTouchStart(evt) {
                return evt.preventDefault();
            }
        } : {
            onTouchStart: function onTouchStart(evt) {
                return gestureManager.onTouchStart(evt, id);
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
        };

        var styleWithAddons = [].concat(_toConsumableArray(Array.isArray(style) ? style : [style]), [styles.preventScrolls]);

        return React.createElement(KeypadButton, _extends({
            ref: function ref(node) {
                return gestureManager.registerDOMNode(id, ReactDOM.findDOMNode(node), childKeyIds, borders);
            },
            borders: borders,
            disabled: disabled,
            style: styleWithAddons
        }, eventHandlers, rest));
    }
});

var extractProps = function extractProps(keyConfig) {
    var ariaLabel = keyConfig.ariaLabel,
        icon = keyConfig.icon,
        type = keyConfig.type;

    return { ariaLabel: ariaLabel, icon: icon, type: type };
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
    var gestures = state.gestures;

    var keyConfig = ownProps.keyConfig,
        rest = _objectWithoutProperties(ownProps, ['keyConfig']);

    var id = keyConfig.id,
        childKeyIds = keyConfig.childKeyIds,
        type = keyConfig.type;


    var childKeys = childKeyIds && childKeyIds.map(function (id) {
        return KeyConfigs[id];
    });

    // Override with the default child props, if the key is a multi-symbol key
    // (but not a many-symbol key, which operates under different rules).
    var useFirstChildProps = type !== KeyTypes.MANY && childKeys && childKeys.length > 0;

    return _extends({}, rest, {
        childKeyIds: childKeyIds,
        gestureManager: gestures.gestureManager,
        id: id,

        // Add in some gesture state.
        focused: gestures.focus === id,
        popoverEnabled: gestures.popover && gestures.popover.parentId === id,

        // Pass down the child keys and any extracted props.
        childKeys: childKeys
    }, extractProps(useFirstChildProps ? childKeys[0] : keyConfig));
};

var styles = StyleSheet.create({
    preventScrolls: {
        // Touch events that start in the touchable buttons shouldn't be
        // allowed to produce page scrolls.
        touchAction: "none"
    }
});

module.exports = connect(mapStateToProps)(TouchableKeypadButton);