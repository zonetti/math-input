'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
/**
 * A component that renders and animates the selection state effect effect.
 */

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var KeypadButton = require('./keypad-button');
var KeyConfigs = require('../data/key-configs');

var _require = require('../consts'),
    KeyTypes = _require.KeyTypes,
    EchoAnimationTypes = _require.EchoAnimationTypes;

var _require2 = require('./prop-types'),
    echoPropType = _require2.echoPropType,
    bordersPropType = _require2.bordersPropType,
    boundingBoxPropType = _require2.boundingBoxPropType,
    keyIdPropType = _require2.keyIdPropType;

var zIndexes = require('./z-indexes');

var Echo = function (_React$Component) {
    _inherits(Echo, _React$Component);

    function Echo() {
        _classCallCheck(this, Echo);

        return _possibleConstructorReturn(this, (Echo.__proto__ || Object.getPrototypeOf(Echo)).apply(this, arguments));
    }

    _createClass(Echo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // NOTE(charlie): This is somewhat unfortunate, as the component is
            // encoding information about its own animation, of which it should be
            // ignorant. However, there doesn't seem to be a cleaner way to make
            // this happen, and at least here, all the animation context is
            // colocated in this file.
            var _props = this.props,
                animationDurationMs = _props.animationDurationMs,
                onAnimationFinish = _props.onAnimationFinish;

            setTimeout(function () {
                return onAnimationFinish();
            }, animationDurationMs);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                borders = _props2.borders,
                id = _props2.id,
                initialBounds = _props2.initialBounds;
            var icon = KeyConfigs[id].icon;


            var containerStyle = _extends({
                zIndex: zIndexes.echo,
                position: 'absolute',
                pointerEvents: 'none'
            }, initialBounds);

            // NOTE(charlie): In some browsers, Aphrodite doesn't seem to flush its
            // styles quickly enough, so there's a flickering effect on the first
            // animation. Thus, it's much safer to do the styles purely inline.
            // <View> makes this difficult because some of its defaults, which are
            // applied via StyleSheet, will override our inlines.
            return React.createElement(
                'div',
                { style: containerStyle },
                React.createElement(KeypadButton, {
                    name: id,
                    icon: icon,
                    type: KeyTypes.ECHO,
                    borders: borders
                })
            );
        }
    }]);

    return Echo;
}(React.Component);

Echo.propTypes = {
    animationDurationMs: PropTypes.number.isRequired,
    borders: bordersPropType,
    id: keyIdPropType.isRequired,
    initialBounds: boundingBoxPropType.isRequired,
    onAnimationFinish: PropTypes.func.isRequired
};

var EchoManager = function (_React$Component2) {
    _inherits(EchoManager, _React$Component2);

    function EchoManager() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, EchoManager);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = EchoManager.__proto__ || Object.getPrototypeOf(EchoManager)).call.apply(_ref, [this].concat(args))), _this2), _this2._animationConfigForType = function (animationType) {
            // NOTE(charlie): These must be kept in sync with the transition
            // durations and classnames specified in echo.css.
            var animationDurationMs = void 0;
            var animationTransitionName = void 0;

            switch (animationType) {
                case EchoAnimationTypes.SLIDE_AND_FADE:
                    animationDurationMs = 400;
                    animationTransitionName = 'echo-slide-and-fade';
                    break;

                case EchoAnimationTypes.FADE_ONLY:
                    animationDurationMs = 300;
                    animationTransitionName = 'echo-fade-only';
                    break;

                case EchoAnimationTypes.LONG_FADE_ONLY:
                    animationDurationMs = 400;
                    animationTransitionName = 'echo-long-fade-only';
                    break;

                default:
                    throw new Error("Invalid echo animation type:", animationType);
            }

            return {
                animationDurationMs: animationDurationMs,
                animationTransitionName: animationTransitionName
            };
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(EchoManager, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props3 = this.props,
                echoes = _props3.echoes,
                _onAnimationFinish = _props3.onAnimationFinish;


            return React.createElement(
                'span',
                null,
                Object.keys(EchoAnimationTypes).map(function (animationType) {
                    // Collect the relevant parameters for the animation type, and
                    // filter for the appropriate echoes.
                    var _animationConfigForTy = _this3._animationConfigForType(animationType),
                        animationDurationMs = _animationConfigForTy.animationDurationMs,
                        animationTransitionName = _animationConfigForTy.animationTransitionName;

                    var echoesForType = echoes.filter(function (echo) {
                        return echo.animationType === animationType;
                    });

                    // TODO(charlie): Manage this animation with Aphrodite styles.
                    // Right now, there's a bug in the autoprefixer that breaks CSS
                    // transitions on mobile Safari.
                    // See: https://github.com/Khan/aphrodite/issues/68.
                    // As such, we have to do this with a stylesheet.
                    return React.createElement(
                        ReactCSSTransitionGroup,
                        {
                            transitionName: animationTransitionName,
                            transitionEnter: true,
                            transitionLeave: false,
                            transitionEnterTimeout: animationDurationMs,
                            key: animationType
                        },
                        echoesForType.map(function (echo) {
                            var animationId = echo.animationId;

                            return React.createElement(Echo, _extends({
                                key: animationId,
                                animationDurationMs: animationDurationMs,
                                onAnimationFinish: function onAnimationFinish() {
                                    return _onAnimationFinish(animationId);
                                }
                            }, echo));
                        })
                    );
                })
            );
        }
    }]);

    return EchoManager;
}(React.Component);

EchoManager.propTypes = {
    echoes: PropTypes.arrayOf(echoPropType),
    onAnimationFinish: PropTypes.func.isRequired
};


module.exports = EchoManager;