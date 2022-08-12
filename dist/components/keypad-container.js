'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var _require = require('react-redux'),
    connect = _require.connect;

var _require2 = require('aphrodite'),
    StyleSheet = _require2.StyleSheet;

var _require3 = require('../fake-react-native-web'),
    View = _require3.View;

var FractionKeypad = require('./fraction-keypad');
var ExpressionKeypad = require('./expression-keypad');
var NavigationPad = require('./navigation-pad');
var zIndexes = require('./z-indexes');

var _require4 = require('../actions'),
    setPageSize = _require4.setPageSize;

var _require5 = require('./prop-types'),
    keyIdPropType = _require5.keyIdPropType;

var _require6 = require('../consts'),
    KeypadTypes = _require6.KeypadTypes,
    LayoutModes = _require6.LayoutModes;

var _require7 = require('./styles'),
    row = _require7.row,
    centered = _require7.centered,
    fullWidth = _require7.fullWidth;

var _require8 = require('./common-style'),
    innerBorderColor = _require8.innerBorderColor,
    innerBorderStyle = _require8.innerBorderStyle,
    innerBorderWidthPx = _require8.innerBorderWidthPx,
    compactKeypadBorderRadiusPx = _require8.compactKeypadBorderRadiusPx;

var KeypadContainer = function (_React$Component) {
    _inherits(KeypadContainer, _React$Component);

    function KeypadContainer() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, KeypadContainer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = KeypadContainer.__proto__ || Object.getPrototypeOf(KeypadContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            hasBeenActivated: false,
            viewportWidth: "100vw"
        }, _this._throttleResizeHandler = function () {
            // Throttle the resize callbacks.
            // https://developer.mozilla.org/en-US/docs/Web/Events/resize
            if (_this._resizeTimeout == null) {
                _this._resizeTimeout = setTimeout(function () {
                    _this._resizeTimeout = null;

                    _this._onResize();
                }, 66);
            }
        }, _this._onResize = function () {
            // Whenever the page resizes, we need to force an update, as the button
            // heights and keypad width are computed based on horizontal space.
            _this.setState({
                viewportWidth: window.innerWidth
            });

            _this.props.onPageSizeChange(window.innerWidth, window.innerHeight);
        }, _this.renderKeypad = function () {
            var _this$props = _this.props,
                extraKeys = _this$props.extraKeys,
                keypadType = _this$props.keypadType,
                layoutMode = _this$props.layoutMode,
                navigationPadEnabled = _this$props.navigationPadEnabled;


            var keypadProps = {
                extraKeys: extraKeys,
                // HACK(charlie): In order to properly round the corners of the
                // compact keypad, we need to instruct some of our child views to
                // crop themselves. At least we're colocating all the layout
                // information in this component, though.
                roundTopLeft: layoutMode === LayoutModes.COMPACT && !navigationPadEnabled,
                roundTopRight: layoutMode === LayoutModes.COMPACT
            };

            // Select the appropriate keyboard given the type.
            // TODO(charlie): In the future, we might want to move towards a
            // data-driven approach to defining keyboard layouts, and have a
            // generic keyboard that takes some "keyboard data" and renders it.
            // However, the keyboards differ pretty heavily right now and it's not
            // clear what that format would look like exactly. Plus, there aren't
            // very many of them. So to keep us moving, we'll just hardcode.
            switch (keypadType) {
                case KeypadTypes.FRACTION:
                    return React.createElement(FractionKeypad, keypadProps);

                case KeypadTypes.EXPRESSION:
                    return React.createElement(ExpressionKeypad, keypadProps);

                default:
                    throw new Error("Invalid keypad type: " + keypadType);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(KeypadContainer, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.active) {
                this.setState({
                    hasBeenActivated: this.props.active
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // Relay the initial size metrics.
            this._onResize();

            // And update it on resize.
            window.addEventListener("resize", this._throttleResizeHandler);
            window.addEventListener("orientationchange", this._throttleResizeHandler);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (!this.state.hasBeenActivated && nextProps.active) {
                this.setState({
                    hasBeenActivated: true
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.active && !this.props.active) {
                this.props.onDismiss && this.props.onDismiss();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener("resize", this._throttleResizeHandler);
            window.removeEventListener("orientationchange", this._throttleResizeHandler);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                active = _props.active,
                layoutMode = _props.layoutMode,
                navigationPadEnabled = _props.navigationPadEnabled,
                onElementMounted = _props.onElementMounted,
                style = _props.style;
            var hasBeenActivated = this.state.hasBeenActivated;

            // NOTE(charlie): We render the transforms as pure inline styles to
            // avoid an Aphrodite bug in mobile Safari.
            //   See: https://github.com/Khan/aphrodite/issues/68.

            var dynamicStyle = _extends({}, active ? inlineStyles.active : inlineStyles.hidden, !active && !hasBeenActivated ? inlineStyles.invisible : {});

            var keypadContainerStyle = [row, centered, fullWidth, styles.keypadContainer].concat(_toConsumableArray(Array.isArray(style) ? style : [style]));

            var keypadStyle = [row, styles.keypadBorder, layoutMode === LayoutModes.FULLSCREEN ? styles.fullscreen : styles.compact];

            // TODO(charlie): When the keypad is shorter than the width of the
            // screen, add a border on its left and right edges, and round out the
            // corners.
            return React.createElement(
                View,
                {
                    style: keypadContainerStyle,
                    dynamicStyle: dynamicStyle,
                    extraClassName: 'keypad-container'
                },
                React.createElement(
                    View,
                    {
                        style: keypadStyle,
                        ref: function ref(element) {
                            if (!_this2.hasMounted && element) {
                                _this2.hasMounted = true;
                                onElementMounted(element);
                            }
                        }
                    },
                    navigationPadEnabled && React.createElement(NavigationPad, {
                        roundTopLeft: layoutMode === LayoutModes.COMPACT,
                        style: styles.navigationPadContainer
                    }),
                    React.createElement(
                        View,
                        { style: styles.keypadLayout },
                        this.renderKeypad()
                    )
                )
            );
        }
    }]);

    return KeypadContainer;
}(React.Component);

KeypadContainer.propTypes = {
    active: PropTypes.bool,
    extraKeys: PropTypes.arrayOf(keyIdPropType),
    keypadType: PropTypes.oneOf(Object.keys(KeypadTypes)).isRequired,
    layoutMode: PropTypes.oneOf(Object.keys(LayoutModes)).isRequired,
    navigationPadEnabled: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func,
    // A callback that should be triggered with the root React element on
    // mount.
    onElementMounted: PropTypes.func,
    onPageSizeChange: PropTypes.func.isRequired,
    style: PropTypes.any
};


var keypadAnimationDurationMs = 300;
var borderWidthPx = 1;

var styles = StyleSheet.create({
    keypadContainer: {
        bottom: 0,
        left: 0,
        right: 0,
        position: 'fixed',
        transition: keypadAnimationDurationMs + 'ms ease-out',
        transitionProperty: 'transform',
        zIndex: zIndexes.keypad
    },

    keypadBorder: {
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderStyle: 'solid'
    },

    fullscreen: {
        borderTopWidth: borderWidthPx
    },

    compact: {
        borderTopRightRadius: compactKeypadBorderRadiusPx,
        borderTopLeftRadius: compactKeypadBorderRadiusPx,

        borderTopWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx
    },

    navigationPadContainer: {
        // Add a separator between the navigation pad and the keypad.
        borderRight: innerBorderWidthPx + 'px ' + innerBorderStyle + ' ' + ('' + innerBorderColor),
        boxSizing: 'content-box'
    },

    // Defer to the navigation pad, such that the navigation pad is always
    // rendered at full-width, and the keypad takes up just the remaining space.
    // TODO(charlie): Avoid shrinking the keys and, instead, make the keypad
    // scrollable.
    keypadLayout: {
        flexGrow: 1,
        // Avoid unitless flex-basis, per: https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
        flexBasis: '0%'
    }
});

// Note: these don't go through an autoprefixer/aphrodite.
var inlineStyles = {
    // If the keypad is yet to have ever been activated, we keep it invisible
    // so as to avoid, e.g., the keypad flashing at the bottom of the page
    // during the initial render.
    invisible: {
        visibility: 'hidden'
    },

    hidden: {
        msTransform: 'translate3d(0, 100%, 0)',
        WebkitTransform: 'translate3d(0, 100%, 0)',
        transform: 'translate3d(0, 100%, 0)'
    },

    active: {
        msTransform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)'
    }
};

var mapStateToProps = function mapStateToProps(state) {
    return _extends({}, state.keypad, {
        layoutMode: state.layout.layoutMode,
        navigationPadEnabled: state.layout.navigationPadEnabled
    });
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onPageSizeChange: function onPageSizeChange(pageWidthPx, pageHeightPx) {
            dispatch(setPageSize(pageWidthPx, pageHeightPx));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(KeypadContainer);