'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * A component that renders a navigation pad, which consists of an arrow for
 * each possible direction.
 */
var React = require('react');

var _require = require('aphrodite'),
    StyleSheet = _require.StyleSheet;

var _require2 = require('../fake-react-native-web'),
    View = _require2.View;

var TouchableKeypadButton = require('./touchable-keypad-button');

var _require3 = require('./styles'),
    row = _require3.row,
    column = _require3.column,
    centered = _require3.centered,
    stretch = _require3.stretch,
    roundedTopLeft = _require3.roundedTopLeft;

var _require4 = require('./common-style'),
    navigationPadWidthPx = _require4.navigationPadWidthPx,
    controlGrey = _require4.controlGrey,
    valueGrey = _require4.valueGrey,
    gray85 = _require4.gray85;

var _require5 = require('../consts'),
    BorderStyles = _require5.BorderStyles;

var KeyConfigs = require('../data/key-configs');

var NavigationPad = React.createClass({
    displayName: 'NavigationPad',

    propTypes: {
        roundTopLeft: React.PropTypes.bool,
        style: React.PropTypes.any
    },

    render: function render() {
        // TODO(charlie): Disable the navigational arrows depending on the
        // cursor context.
        var _props = this.props,
            roundTopLeft = _props.roundTopLeft,
            style = _props.style;


        var containerStyle = [column, centered, styles.container, roundTopLeft && roundedTopLeft].concat(_toConsumableArray(Array.isArray(style) ? style : [style]));

        return React.createElement(
            View,
            { style: containerStyle },
            React.createElement(
                View,
                { style: [row, centered] },
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.UP,
                    borders: BorderStyles.NONE,
                    style: [styles.navigationKey, styles.topArrow]
                })
            ),
            React.createElement(
                View,
                { style: [row, centered, stretch] },
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.LEFT,
                    borders: BorderStyles.NONE,
                    style: [styles.navigationKey, styles.leftArrow]
                }),
                React.createElement(View, { style: styles.horizontalSpacer }),
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.RIGHT,
                    borders: BorderStyles.NONE,
                    style: [styles.navigationKey, styles.rightArrow]
                })
            ),
            React.createElement(
                View,
                { style: [row, centered] },
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.DOWN,
                    borders: BorderStyles.NONE,
                    style: [styles.navigationKey, styles.bottomArrow]
                })
            )
        );
    }
});

var buttonSizePx = 48;
var borderRadiusPx = 4;
var borderWidthPx = 1;

var styles = StyleSheet.create({
    container: {
        backgroundColor: controlGrey,
        width: navigationPadWidthPx
    },

    navigationKey: {
        borderColor: gray85,
        backgroundColor: valueGrey,
        width: buttonSizePx,
        height: buttonSizePx,

        // Override the default box-sizing so that our buttons are
        // `buttonSizePx` exclusive of their borders.
        boxSizing: 'content-box'
    },

    topArrow: {
        borderTopWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderTopLeftRadius: borderRadiusPx,
        borderTopRightRadius: borderRadiusPx
    },

    rightArrow: {
        borderTopWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderBottomWidth: borderWidthPx,
        borderTopRightRadius: borderRadiusPx,
        borderBottomRightRadius: borderRadiusPx
    },

    bottomArrow: {
        borderBottomWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderBottomLeftRadius: borderRadiusPx,
        borderBottomRightRadius: borderRadiusPx
    },

    leftArrow: {
        borderTopWidth: borderWidthPx,
        borderBottomWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderTopLeftRadius: borderRadiusPx,
        borderBottomLeftRadius: borderRadiusPx
    },

    horizontalSpacer: {
        background: valueGrey,
        // No need to set a height -- the spacer will be stretched by its
        // parent.
        width: buttonSizePx
    }
});

module.exports = NavigationPad;