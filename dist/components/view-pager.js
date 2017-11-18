'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * A view pager that allows for pagination in the horizontal direction.
 * Right now, there are a number of limitations built into the system. Namely:
 *  - It only supports pagination in the horizontal direction.
 *  - It supports exactly two pages.
 */

var React = require('react');

var _require = require('react-redux'),
    connect = _require.connect;

var _require2 = require('aphrodite'),
    StyleSheet = _require2.StyleSheet;

var _require3 = require('../fake-react-native-web'),
    View = _require3.View;

var _require4 = require('./styles'),
    row = _require4.row;

var _require5 = require('./prop-types'),
    childrenPropType = _require5.childrenPropType;

var _require6 = require('./common-style'),
    innerBorderColor = _require6.innerBorderColor,
    innerBorderStyle = _require6.innerBorderStyle,
    innerBorderWidthPx = _require6.innerBorderWidthPx;

var ViewPager = React.createClass({
    displayName: 'ViewPager',

    propTypes: {
        // Whether the page should animate to its next specified position.
        animateToPosition: React.PropTypes.bool,
        children: childrenPropType,
        pageWidthPx: React.PropTypes.number.isRequired,
        translateX: React.PropTypes.number.isRequired
    },

    getInitialState: function getInitialState() {
        return {
            animationDurationMs: 0
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        // Compute the appropriate animation length, if the pager should
        // animate to its next position.
        var animationDurationMs = void 0;
        if (newProps.animateToPosition) {
            var finalTranslateX = newProps.translateX;
            var prevTranslateX = this.props.translateX;

            // We animate at a rate of 1 pixel per millisecond, and thus we can
            // use the displacement as the animation duration.
            animationDurationMs = Math.abs(finalTranslateX - prevTranslateX);
        } else {
            animationDurationMs = 0;
        }
        this.setState({
            animationDurationMs: animationDurationMs
        });
    },
    render: function render() {
        var _props = this.props,
            children = _props.children,
            pageWidthPx = _props.pageWidthPx,
            translateX = _props.translateX;
        var animationDurationMs = this.state.animationDurationMs;


        var pagerStyle = [row, styles.twoPagePager];

        var transform = {
            msTransform: 'translate3d(' + translateX + 'px, 0, 0)',
            WebkitTransform: 'translate3d(' + translateX + 'px, 0, 0)',
            transform: 'translate3d(' + translateX + 'px, 0, 0)'
        };
        var animate = animationDurationMs ? {
            msTransitionProperty: 'transform',
            WebkitTransitionProperty: 'transform',
            transitionProperty: 'transform',
            msTransitionDuration: animationDurationMs + 'ms',
            WebkitTransitionDuration: animationDurationMs + 'ms',
            transitionDuration: animationDurationMs + 'ms',
            msTransitionTimingFunction: 'ease-out',
            WebkitTransitionTimingFunction: 'ease-out',
            transitionTimingFunction: 'ease-out'
        } : {};
        var dynamicPagerStyle = _extends({}, transform, animate);

        var dynamicPageStyle = {
            width: pageWidthPx
        };

        return React.createElement(
            View,
            { style: pagerStyle, dynamicStyle: dynamicPagerStyle },
            React.createElement(
                View,
                { dynamicStyle: dynamicPageStyle },
                children[0]
            ),
            React.createElement(
                View,
                { style: styles.rightPage, dynamicStyle: dynamicPageStyle },
                children[1]
            )
        );
    }
});

var styles = StyleSheet.create({
    twoPagePager: {
        alignSelf: 'flex-start',
        // Note: By default, <View> sets a `maxWidth` of 100% to fix some
        // Flexbox bugs. We have to override it to accommodate for our two
        // pages. The exact value here isn't super important, as long as it's
        // large enough to accommodate for two pages (so, 200%) and some
        // separators.
        maxWidth: '250%'
    },

    rightPage: {
        borderLeft: innerBorderWidthPx + 'px ' + innerBorderStyle + ' ' + ('' + innerBorderColor),
        boxSizing: 'content-box'
    }
});

var mapStateToProps = function mapStateToProps(state) {
    var _state$pager = state.pager,
        animateToPosition = _state$pager.animateToPosition,
        currentPage = _state$pager.currentPage,
        dx = _state$pager.dx,
        pageWidthPx = _state$pager.pageWidthPx;

    return {
        animateToPosition: animateToPosition,
        pageWidthPx: pageWidthPx,
        translateX: -currentPage * (pageWidthPx + innerBorderWidthPx) + dx
    };
};

module.exports = connect(mapStateToProps)(ViewPager);