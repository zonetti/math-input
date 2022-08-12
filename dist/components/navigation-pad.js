'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
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

var NavigationPad = function (_React$Component) {
    _inherits(NavigationPad, _React$Component);

    function NavigationPad() {
        _classCallCheck(this, NavigationPad);

        return _possibleConstructorReturn(this, (NavigationPad.__proto__ || Object.getPrototypeOf(NavigationPad)).apply(this, arguments));
    }

    _createClass(NavigationPad, [{
        key: 'render',
        value: function render() {
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
    }]);

    return NavigationPad;
}(React.Component);

NavigationPad.propTypes = {
    roundTopLeft: PropTypes.bool,
    style: PropTypes.any
};


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