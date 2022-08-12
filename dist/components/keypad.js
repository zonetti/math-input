'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
/**
 * A keypad component that acts as a container for rows or columns of buttons,
 * and manages the rendering of echo animations on top of those buttons.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var _require = require('react-redux'),
    connect = _require.connect;

var _require2 = require('../actions'),
    _removeEcho = _require2.removeEcho;

var _require3 = require('../fake-react-native-web'),
    View = _require3.View;

var EchoManager = require('./echo-manager');
var PopoverManager = require('./popover-manager');

var _require4 = require('./prop-types'),
    echoPropType = _require4.echoPropType,
    popoverPropType = _require4.popoverPropType;

var Keypad = function (_React$Component) {
    _inherits(Keypad, _React$Component);

    function Keypad() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Keypad);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Keypad.__proto__ || Object.getPrototypeOf(Keypad)).call.apply(_ref, [this].concat(args))), _this), _this._computeContainer = function () {
            var domNode = ReactDOM.findDOMNode(_this);
            _this._container = domNode.getBoundingClientRect();
        }, _this._updateSizeAndPosition = function () {
            // Mark the container for recalculation next time the keypad is
            // opened.
            // TODO(charlie): Since we're not recalculating the container
            // immediately, if you were to resize the page while a popover were
            // active, you'd likely get unexpected behavior. This seems very
            // difficult to do and, as such, incredibly unlikely, but we may
            // want to reconsider the caching here.
            _this._container = null;
        }, _this._onResize = function () {
            // Whenever the page resizes, we need to recompute the container's
            // bounding box. This is the only time that the bounding box can change.

            // Throttle resize events -- taken from:
            //    https://developer.mozilla.org/en-US/docs/Web/Events/resize
            if (_this._resizeTimeout == null) {
                _this._resizeTimeout = setTimeout(function () {
                    _this._resizeTimeout = null;

                    if (_this._isMounted) {
                        _this._updateSizeAndPosition();
                    }
                }, 66);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Keypad, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._isMounted = true;
            window.addEventListener("resize", this._onResize);
            this._updateSizeAndPosition();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (!this._container && (newProps.popover || newProps.echoes.length)) {
                this._computeContainer();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._isMounted = false;
            window.removeEventListener("resize", this._onResize);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                children = _props.children,
                echoes = _props.echoes,
                removeEcho = _props.removeEcho,
                popover = _props.popover,
                style = _props.style;

            // Translate the echo boxes, as they'll be positioned absolutely to
            // this relative container.

            var relativeEchoes = echoes.map(function (echo) {
                var initialBounds = echo.initialBounds,
                    rest = _objectWithoutProperties(echo, ['initialBounds']);

                return _extends({}, rest, {
                    initialBounds: {
                        top: initialBounds.top - _this2._container.top,
                        right: initialBounds.right - _this2._container.left,
                        bottom: initialBounds.bottom - _this2._container.top,
                        left: initialBounds.left - _this2._container.left,
                        width: initialBounds.width,
                        height: initialBounds.height
                    }
                });
            });

            // Translate the popover bounds from page-absolute to keypad-relative.
            // Note that we only need three bounds, since popovers are anchored to
            // the bottom left corners of the keys over which they appear.
            var relativePopover = popover && _extends({}, popover, {
                bounds: {
                    bottom: this._container.height - (popover.bounds.bottom - this._container.top),
                    left: popover.bounds.left - this._container.left,
                    width: popover.bounds.width
                }
            });

            return React.createElement(
                View,
                { style: style },
                children,
                React.createElement(EchoManager, {
                    echoes: relativeEchoes,
                    onAnimationFinish: removeEcho
                }),
                React.createElement(PopoverManager, { popover: relativePopover })
            );
        }
    }]);

    return Keypad;
}(React.Component);

Keypad.propTypes = {
    // Whether the keypad is active, i.e., whether it should be rendered as
    // visible or invisible.
    active: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    echoes: PropTypes.arrayOf(echoPropType).isRequired,
    popover: popoverPropType,
    removeEcho: PropTypes.func.isRequired,
    style: PropTypes.any
};


var mapStateToProps = function mapStateToProps(state) {
    return _extends({}, state.echoes, {
        active: state.keypad.active,
        popover: state.gestures.popover
    });
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        removeEcho: function removeEcho(animationId) {
            dispatch(_removeEcho(animationId));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Keypad);