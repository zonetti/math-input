'use strict';

/**
 * A keypad with two pages of keys.
 */

var React = require('react');

var _require = require('react-redux'),
    connect = _require.connect;

var _require2 = require('aphrodite'),
    StyleSheet = _require2.StyleSheet;

var Keypad = require('./keypad');
var ViewPager = require('./view-pager');
var PagerIndicator = require('./pager-indicator');

var _require3 = require('../fake-react-native-web'),
    View = _require3.View;

var _require4 = require('./styles'),
    column = _require4.column,
    row = _require4.row,
    fullWidth = _require4.fullWidth;

var _require5 = require('./common-style'),
    innerBorderColor = _require5.innerBorderColor,
    innerBorderStyle = _require5.innerBorderStyle,
    innerBorderWidthPx = _require5.innerBorderWidthPx,
    gray85 = _require5.gray85;

var TwoPageKeypad = React.createClass({
    displayName: 'TwoPageKeypad',

    propTypes: {
        currentPage: React.PropTypes.oneOf([0, 1]).isRequired,
        leftPage: React.PropTypes.node.isRequired,
        paginationEnabled: React.PropTypes.bool.isRequired,
        rightPage: React.PropTypes.node.isRequired
    },

    render: function render() {
        var _props = this.props,
            currentPage = _props.currentPage,
            leftPage = _props.leftPage,
            paginationEnabled = _props.paginationEnabled,
            rightPage = _props.rightPage;


        if (paginationEnabled) {
            return React.createElement(
                Keypad,
                { style: [column, styles.keypad] },
                React.createElement(PagerIndicator, { numPages: 2, currentPage: currentPage }),
                React.createElement(
                    View,
                    { style: styles.borderTop },
                    React.createElement(
                        ViewPager,
                        null,
                        leftPage,
                        rightPage
                    )
                )
            );
        } else {
            return React.createElement(
                Keypad,
                { style: styles.keypad },
                React.createElement(
                    View,
                    { style: row },
                    React.createElement(
                        View,
                        { style: fullWidth },
                        leftPage
                    ),
                    React.createElement(
                        View,
                        { style: [styles.borderLeft, fullWidth] },
                        rightPage
                    )
                )
            );
        }
    }
});

var styles = StyleSheet.create({
    keypad: {
        // Set the background to light grey, so that when the user drags the
        // keypad pages past the edges, there's a grey backdrop.
        backgroundColor: gray85
    },

    borderTop: {
        borderTop: innerBorderWidthPx + 'px ' + innerBorderStyle + ' ' + ('' + innerBorderColor)
    },
    borderLeft: {
        borderLeft: innerBorderWidthPx + 'px ' + innerBorderStyle + ' ' + ('' + innerBorderColor),
        boxSizing: 'content-box'
    }
});

var mapStateToProps = function mapStateToProps(state) {
    return {
        paginationEnabled: state.layout.paginationEnabled
    };
};

module.exports = connect(mapStateToProps)(TwoPageKeypad);