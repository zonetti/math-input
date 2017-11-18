'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Renders the green tear-shaped handle under the cursor.
 */

var React = require('react');

var _require = require('../common-style'),
    cursorHandleRadiusPx = _require.cursorHandleRadiusPx,
    brightGreen = _require.brightGreen,
    cursorHandleDistanceMultiplier = _require.cursorHandleDistanceMultiplier;

var touchTargetRadiusPx = 22;
var touchTargetHeightPx = 2 * touchTargetRadiusPx;
var touchTargetWidthPx = 2 * touchTargetRadiusPx;

var cursorRadiusPx = cursorHandleRadiusPx;
var cursorHeightPx = cursorHandleDistanceMultiplier * cursorRadiusPx + cursorRadiusPx;
var cursorWidthPx = 2 * cursorRadiusPx;

var CursorHandle = React.createClass({
    displayName: 'CursorHandle',

    propTypes: {
        animateIntoPosition: React.PropTypes.bool,
        onTouchCancel: React.PropTypes.func.isRequired,
        onTouchEnd: React.PropTypes.func.isRequired,
        onTouchMove: React.PropTypes.func.isRequired,
        onTouchStart: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired,
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            animateIntoPosition: false,
            visible: false,
            x: 0,
            y: 0
        };
    },
    render: function render() {
        var _props = this.props,
            x = _props.x,
            y = _props.y,
            animateIntoPosition = _props.animateIntoPosition;


        var animationStyle = animateIntoPosition ? {
            msTransitionDuration: '100ms',
            WebkitTransitionDuration: '100ms',
            transitionDuration: '100ms',
            msTransitionProperty: 'transform',
            WebkitTransitionProperty: 'transform',
            transitionProperty: 'transform'
        } : {};
        var transformString = 'translate(' + x + 'px, ' + y + 'px)';

        var outerStyle = _extends({
            position: 'absolute',
            // This is essentially webapp's interactiveComponent + 1.
            // TODO(charlie): Pull in those styles somehow to avoid breakages.
            zIndex: 4,
            left: -touchTargetWidthPx / 2,
            top: 0,
            msTransform: transformString,
            WebkitTransform: transformString,
            transform: transformString,
            width: touchTargetWidthPx,
            height: touchTargetHeightPx,
            // Touch events that start on the cursor shouldn't be allowed to
            // produce page scrolls.
            touchAction: "none"
        }, animationStyle);

        var innerStyle = {
            marginLeft: touchTargetRadiusPx - cursorRadiusPx
        };

        return React.createElement(
            'span',
            {
                style: outerStyle,
                onTouchStart: this.props.onTouchStart,
                onTouchMove: this.props.onTouchMove,
                onTouchEnd: this.props.onTouchEnd,
                onTouchCancel: this.props.onTouchCancel
            },
            React.createElement(
                'svg',
                {
                    width: cursorWidthPx,
                    height: cursorHeightPx,
                    viewBox: '-' + cursorRadiusPx + ' 0 ' + cursorWidthPx + ' ' + cursorHeightPx,
                    style: innerStyle
                },
                React.createElement('path', {
                    d: 'M 0 0\n                        L -' + 0.707 * cursorRadiusPx + ' ' + 0.707 * cursorRadiusPx + '\n                        A ' + cursorRadiusPx + ' ' + cursorRadiusPx + ', 0, 1, 0,\n                          ' + 0.707 * cursorRadiusPx + ' ' + 0.707 * cursorRadiusPx + '\n                        Z',
                    fill: brightGreen
                })
            )
        );
    }
});

module.exports = CursorHandle;