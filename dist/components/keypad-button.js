'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var PropTypes = require('prop-types');
/**
 * A component that renders a keypad button.
 */

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var _require = require('react-redux'),
    connect = _require.connect;

var _require2 = require('aphrodite'),
    StyleSheet = _require2.StyleSheet,
    css = _require2.css;

var _require3 = require('../fake-react-native-web'),
    View = _require3.View;

var Icon = require('./icon');
var MultiSymbolGrid = require('./multi-symbol-grid');
var CornerDecal = require('./corner-decal');

var _require4 = require('../consts'),
    KeyTypes = _require4.KeyTypes,
    BorderDirections = _require4.BorderDirections,
    BorderStyles = _require4.BorderStyles;

var _require5 = require('./common-style'),
    brightGreen = _require5.brightGreen,
    innerBorderColor = _require5.innerBorderColor,
    innerBorderStyle = _require5.innerBorderStyle,
    innerBorderWidthPx = _require5.innerBorderWidthPx,
    valueGrey = _require5.valueGrey,
    operatorGrey = _require5.operatorGrey,
    controlGrey = _require5.controlGrey,
    emptyGrey = _require5.emptyGrey;

var _require6 = require('./prop-types'),
    bordersPropType = _require6.bordersPropType,
    iconPropType = _require6.iconPropType,
    keyConfigPropType = _require6.keyConfigPropType;

var KeypadButton = React.createClass({
    displayName: 'KeypadButton',

    propTypes: {
        ariaLabel: PropTypes.string,
        // The borders to display on the button. Typically, this should be set
        // using one of the preset `BorderStyles` options.
        borders: bordersPropType,
        // Any additional keys that can be accessed by long-pressing on the
        // button.
        childKeys: PropTypes.arrayOf(keyConfigPropType),
        // Whether the button should be rendered in a 'disabled' state, i.e.,
        // without any touch feedback.
        disabled: PropTypes.bool,
        focused: PropTypes.bool,
        heightPx: PropTypes.number.isRequired,
        icon: iconPropType,
        onTouchCancel: PropTypes.func,
        onTouchEnd: PropTypes.func,
        onTouchMove: PropTypes.func,
        onTouchStart: PropTypes.func,
        popoverEnabled: PropTypes.bool,
        style: PropTypes.any,
        type: PropTypes.oneOf(Object.keys(KeyTypes)).isRequired,
        // NOTE(charlie): We may want to make this optional for phone layouts
        // (and rely on Flexbox instead), since it might not be pixel perfect
        // with borders and such.
        widthPx: PropTypes.number.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps: function getDefaultProps() {
        return {
            borders: BorderStyles.ALL,
            childKeys: [],
            disabled: false,
            focused: false,
            popoverEnabled: false
        };
    },
    componentWillMount: function componentWillMount() {
        this.buttonSizeStyle = styleForButtonDimensions(this.props.heightPx, this.props.widthPx);
    },
    componentDidMount: function componentDidMount() {
        this._preInjectStyles();
    },
    componentWillUpdate: function componentWillUpdate(newProps, newState) {
        // Only recompute the Aphrodite StyleSheet when the button height has
        // changed. Though it is safe to recompute the StyleSheet (since
        // they're content-addressable), it saves us a bunch of hashing and
        // other work to cache it here.
        if (newProps.heightPx !== this.props.heightPx || newProps.widthPx !== this.props.widthPx) {
            this.buttonSizeStyle = styleForButtonDimensions(newProps.heightPx, newProps.widthPx);

            this._preInjectStyles();
        }
    },
    _preInjectStyles: function _preInjectStyles() {
        // HACK(charlie): Pre-inject all of the possible styles for the button.
        // This avoids a flickering effect in the echo animation whereby the
        // echoes vary in size as they animate. Note that we need to account for
        // the "initial" styles that `View` will include, as these styles are
        // applied to `View` components and Aphrodite will consolidate the style
        // object. This method must be called whenever a property that
        // influences the possible outcomes of `this._getFocusStyle` and
        // `this._getButtonStyle` changes (such as `this.buttonSizeStyle`).
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.keys(KeyTypes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var type = _step.value;

                css.apply(undefined, [View.styles.initial].concat(_toConsumableArray(this._getFocusStyle(type))));

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = Object.values(BorderStyles)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var borders = _step2.value;

                        css.apply(undefined, [View.styles.initial].concat(_toConsumableArray(this._getButtonStyle(type, borders))));
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    },
    _getFocusStyle: function _getFocusStyle(type) {
        var focusBackgroundStyle = void 0;
        if (type === KeyTypes.INPUT_NAVIGATION || type === KeyTypes.KEYPAD_NAVIGATION) {
            focusBackgroundStyle = styles.light;
        } else {
            focusBackgroundStyle = styles.bright;
        }

        return [styles.focusBox, focusBackgroundStyle];
    },
    _getButtonStyle: function _getButtonStyle(type, borders, style) {
        // Select the appropriate style for the button.
        var backgroundStyle = void 0;
        switch (type) {
            case KeyTypes.EMPTY:
                backgroundStyle = styles.empty;
                break;

            case KeyTypes.MANY:
            case KeyTypes.VALUE:
                backgroundStyle = styles.value;
                break;

            case KeyTypes.OPERATOR:
                backgroundStyle = styles.operator;
                break;

            case KeyTypes.INPUT_NAVIGATION:
            case KeyTypes.KEYPAD_NAVIGATION:
                backgroundStyle = styles.control;
                break;

            case KeyTypes.ECHO:
                backgroundStyle = null;
                break;
        }

        var borderStyle = [];
        if (borders.indexOf(BorderDirections.LEFT) !== -1) {
            borderStyle.push(styles.leftBorder);
        }
        if (borders.indexOf(BorderDirections.BOTTOM) !== -1) {
            borderStyle.push(styles.bottomBorder);
        }

        return [styles.buttonBase, backgroundStyle].concat(borderStyle, [type === KeyTypes.ECHO && styles.echo, this.buttonSizeStyle], _toConsumableArray(Array.isArray(style) ? style : [style]));
    },
    render: function render() {
        var _props = this.props,
            ariaLabel = _props.ariaLabel,
            borders = _props.borders,
            childKeys = _props.childKeys,
            disabled = _props.disabled,
            focused = _props.focused,
            icon = _props.icon,
            onTouchCancel = _props.onTouchCancel,
            onTouchEnd = _props.onTouchEnd,
            onTouchMove = _props.onTouchMove,
            onTouchStart = _props.onTouchStart,
            popoverEnabled = _props.popoverEnabled,
            style = _props.style,
            type = _props.type;

        // We render in the focus state if the key is focused, or if it's an
        // echo.

        var renderFocused = !disabled && focused || popoverEnabled || type === KeyTypes.ECHO;
        var buttonStyle = this._getButtonStyle(type, borders, style);
        var focusStyle = this._getFocusStyle(type);
        var iconWrapperStyle = [styles.iconWrapper, disabled && styles.disabled];

        var eventHandlers = {
            onTouchCancel: onTouchCancel, onTouchEnd: onTouchEnd, onTouchMove: onTouchMove, onTouchStart: onTouchStart
        };

        var maybeFocusBox = renderFocused && React.createElement(View, { style: focusStyle });
        var maybeCornerDecal = !renderFocused && !disabled && childKeys && childKeys.length > 0 && React.createElement(CornerDecal, { style: styles.decalInset });

        if (type === KeyTypes.EMPTY) {
            return React.createElement(View, _extends({ style: buttonStyle }, eventHandlers));
        } else if (type === KeyTypes.MANY) {
            // TODO(charlie): Make the long-press interaction accessible. See
            // the TODO in key-configs.js for more.
            var manyButtonA11yMarkup = {
                role: 'button',
                ariaLabel: childKeys[0].ariaLabel
            };
            var icons = childKeys.map(function (keyConfig) {
                return keyConfig.icon;
            });
            return React.createElement(
                View,
                _extends({
                    style: buttonStyle
                }, eventHandlers, manyButtonA11yMarkup),
                maybeFocusBox,
                React.createElement(
                    View,
                    { style: iconWrapperStyle },
                    React.createElement(MultiSymbolGrid, { icons: icons, focused: renderFocused })
                ),
                maybeCornerDecal
            );
        } else {
            var a11yMarkup = {
                role: 'button',
                ariaLabel: ariaLabel
            };

            return React.createElement(
                View,
                _extends({ style: buttonStyle }, eventHandlers, a11yMarkup),
                maybeFocusBox,
                React.createElement(
                    View,
                    { style: iconWrapperStyle },
                    React.createElement(Icon, { icon: icon, focused: renderFocused })
                ),
                maybeCornerDecal
            );
        }
    }
});

var focusInsetPx = 4;
var focusBoxZIndex = 0;

var styles = StyleSheet.create({
    buttonBase: {
        // HACK(benkomalo): support old style flex box in Android browsers
        '-webkit-box-flex': '1',
        flex: 1,
        cursor: 'pointer',
        // Make the text unselectable
        userSelect: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        // Borders are made selectively visible.
        borderColor: innerBorderColor,
        borderStyle: innerBorderStyle,
        boxSizing: 'border-box'
    },

    decalInset: {
        top: focusInsetPx,
        right: focusInsetPx
    },

    // Overrides for the echo state, where we want to render the borders for
    // layout purposes, but we don't want them to be visible.
    echo: {
        borderColor: 'transparent'
    },

    // Background colors and other base styles that may vary between key types.
    value: {
        backgroundColor: valueGrey
    },
    operator: {
        backgroundColor: operatorGrey
    },
    control: {
        backgroundColor: controlGrey
    },
    empty: {
        backgroundColor: emptyGrey,
        cursor: 'default'
    },

    bright: {
        backgroundColor: brightGreen
    },
    light: {
        backgroundColor: 'rgba(33, 36, 44, 0.1)'
    },

    iconWrapper: {
        zIndex: focusBoxZIndex + 1
    },

    focusBox: {
        position: 'absolute',
        zIndex: focusBoxZIndex,
        left: focusInsetPx,
        right: focusInsetPx,
        bottom: focusInsetPx,
        top: focusInsetPx,
        borderRadius: 1
    },

    disabled: {
        opacity: 0.3
    },

    // Styles used to render the appropriate borders. Buttons are only allowed
    // to render left and bottom borders, to simplify layout.
    leftBorder: {
        borderLeftWidth: innerBorderWidthPx
    },
    bottomBorder: {
        borderBottomWidth: innerBorderWidthPx
    }
});

var styleForButtonDimensions = function styleForButtonDimensions(heightPx, widthPx) {
    return StyleSheet.create({
        buttonSize: {
            height: heightPx,
            width: widthPx,
            maxWidth: widthPx
        }
    }).buttonSize;
};

var mapStateToProps = function mapStateToProps(state) {
    return state.layout.buttonDimensions;
};

module.exports = connect(mapStateToProps)(KeypadButton);