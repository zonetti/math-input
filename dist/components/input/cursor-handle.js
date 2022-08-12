'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
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

var CursorHandle = function (_React$Component) {
    _inherits(CursorHandle, _React$Component);

    function CursorHandle() {
        _classCallCheck(this, CursorHandle);

        return _possibleConstructorReturn(this, (CursorHandle.__proto__ || Object.getPrototypeOf(CursorHandle)).apply(this, arguments));
    }

    _createClass(CursorHandle, [{
        key: 'render',
        value: function render() {
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
    }]);

    return CursorHandle;
}(React.Component);

CursorHandle.propTypes = {
    animateIntoPosition: PropTypes.bool,
    onTouchCancel: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func.isRequired,
    onTouchMove: PropTypes.func.isRequired,
    onTouchStart: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
};
CursorHandle.defaultProps = {
    animateIntoPosition: false,
    visible: false,
    x: 0,
    y: 0
};


module.exports = CursorHandle;