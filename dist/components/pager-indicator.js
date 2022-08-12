'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
/**
 * A component that renders a view pager indicator, with a circular icon for
 * each page.
 */

var React = require('react');

var _require = require('aphrodite'),
    StyleSheet = _require.StyleSheet;

var _require2 = require('../fake-react-native-web'),
    View = _require2.View;

var _require3 = require('./common-style'),
    pageIndicatorHeightPx = _require3.pageIndicatorHeightPx,
    gray68 = _require3.gray68,
    gray85 = _require3.gray85;

var PagerIcon = function (_React$Component) {
    _inherits(PagerIcon, _React$Component);

    function PagerIcon() {
        _classCallCheck(this, PagerIcon);

        return _possibleConstructorReturn(this, (PagerIcon.__proto__ || Object.getPrototypeOf(PagerIcon)).apply(this, arguments));
    }

    _createClass(PagerIcon, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                active = _props.active,
                radiusPx = _props.radiusPx;


            var fillColor = active ? gray68 : gray85;

            return React.createElement(
                'svg',
                { width: 2 * radiusPx, height: 2 * radiusPx },
                React.createElement('circle', {
                    cx: radiusPx,
                    cy: radiusPx,
                    r: radiusPx,
                    fill: fillColor
                })
            );
        }
    }]);

    return PagerIcon;
}(React.Component);

PagerIcon.propTypes = {
    active: PropTypes.bool,
    radiusPx: PropTypes.number
};
PagerIcon.defaultProps = {
    active: false,
    radiusPx: 4
};

var PagerIndicator = function (_React$Component2) {
    _inherits(PagerIndicator, _React$Component2);

    function PagerIndicator() {
        _classCallCheck(this, PagerIndicator);

        return _possibleConstructorReturn(this, (PagerIndicator.__proto__ || Object.getPrototypeOf(PagerIndicator)).apply(this, arguments));
    }

    _createClass(PagerIndicator, [{
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                currentPage = _props2.currentPage,
                numPages = _props2.numPages;


            var pagerIconRadiusPx = 4;

            // Collect the various indicator circles.
            var indicators = [];
            for (var i = 0; i < numPages; i++) {
                indicators.push(React.createElement(PagerIcon, {
                    key: i,
                    active: i === currentPage,
                    radiusPx: pagerIconRadiusPx
                }));
            }

            // Size the box that contains the icons to accommodate for proper
            // spacing, and let Flexbox take care of the details.
            var totalIconWidthPx = 2 * pagerIconRadiusPx * numPages;
            var totalSpacingWidthPx = 2 * pagerIconRadiusPx * (numPages - 1);
            var iconStripSize = {
                width: totalIconWidthPx + totalSpacingWidthPx
            };

            return React.createElement(
                View,
                { style: styles.indicatorStrip },
                React.createElement(
                    View,
                    { style: styles.iconStrip, dynamicStyle: iconStripSize },
                    indicators
                )
            );
        }
    }]);

    return PagerIndicator;
}(React.Component);

PagerIndicator.propTypes = {
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired
};


var styles = StyleSheet.create({
    indicatorStrip: {
        backgroundColor: '#F0F1F2',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: pageIndicatorHeightPx
    },
    iconStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

module.exports = PagerIndicator;