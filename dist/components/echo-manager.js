'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var Echo = React.createClass({
    displayName: 'Echo',

    propTypes: {
        animationDurationMs: PropTypes.number.isRequired,
        borders: bordersPropType,
        id: keyIdPropType.isRequired,
        initialBounds: boundingBoxPropType.isRequired,
        onAnimationFinish: PropTypes.func.isRequired
    },

    componentDidMount: function componentDidMount() {
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
    },
    render: function render() {
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
});

var EchoManager = React.createClass({
    displayName: 'EchoManager',

    propTypes: {
        echoes: PropTypes.arrayOf(echoPropType),
        onAnimationFinish: PropTypes.func.isRequired
    },

    _animationConfigForType: function _animationConfigForType(animationType) {
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
    },
    render: function render() {
        var _this = this;

        var _props3 = this.props,
            echoes = _props3.echoes,
            _onAnimationFinish = _props3.onAnimationFinish;


        return React.createElement(
            'span',
            null,
            Object.keys(EchoAnimationTypes).map(function (animationType) {
                // Collect the relevant parameters for the animation type, and
                // filter for the appropriate echoes.
                var _animationConfigForTy = _this._animationConfigForType(animationType),
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
});

module.exports = EchoManager;