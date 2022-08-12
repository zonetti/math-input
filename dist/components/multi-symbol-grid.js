'use strict';

var PropTypes = require('prop-types');
/**
 * A grid of symbols, rendered as text and positioned based on the number of
 * symbols provided. Up to four symbols will be shown.
 */

var React = require('react');

var _require = require('aphrodite'),
    StyleSheet = _require.StyleSheet;

var _require2 = require('../fake-react-native-web'),
    View = _require2.View;

var Icon = require('./icon');

var _require3 = require('../consts'),
    IconTypes = _require3.IconTypes;

var _require4 = require('./prop-types'),
    iconPropType = _require4.iconPropType;

var _require5 = require('./styles'),
    row = _require5.row,
    column = _require5.column,
    centered = _require5.centered,
    fullWidth = _require5.fullWidth;

var _require6 = require('./common-style'),
    iconSizeHeightPx = _require6.iconSizeHeightPx,
    iconSizeWidthPx = _require6.iconSizeWidthPx;

var MultiSymbolGrid = React.createClass({
    displayName: 'MultiSymbolGrid',

    propTypes: {
        focused: PropTypes.bool,
        icons: PropTypes.arrayOf(iconPropType).isRequired
    },

    render: function render() {
        var _props = this.props,
            focused = _props.focused,
            icons = _props.icons;

        // Validate that we only received math-based icons. Right now, this
        // component only supports math icons (and it should only be passed
        // variables and Greek letters, which are always rendered as math).
        // Supporting other types of icons is possible but would require
        // some styles coercion and doesn't seem worthwhile right now.

        icons.forEach(function (icon) {
            if (icon.type !== IconTypes.MATH) {
                throw new Error('Received invalid icon: type=' + icon.type + ', ' + ('data=' + icon.data));
            }
        });

        if (icons.length === 1) {
            return React.createElement(Icon, { icon: icons[0], focused: focused });
        } else {
            var primaryIconStyle = styles.base;
            var secondaryIconStyle = [styles.base, styles.secondary];

            if (icons.length === 2) {
                return React.createElement(
                    View,
                    { style: [row, styles.size] },
                    React.createElement(
                        View,
                        { style: [column, centered, fullWidth, styles.middleLeft]
                        },
                        React.createElement(Icon, {
                            style: primaryIconStyle,
                            icon: icons[0],
                            focused: focused
                        })
                    ),
                    React.createElement(
                        View,
                        { style: [column, centered, fullWidth, styles.middleRight]
                        },
                        React.createElement(Icon, {
                            style: secondaryIconStyle,
                            icon: icons[1],
                            focused: focused
                        })
                    )
                );
            } else if (icons.length >= 3) {
                return React.createElement(
                    View,
                    { style: [column, styles.size] },
                    React.createElement(
                        View,
                        { style: row },
                        React.createElement(
                            View,
                            { style: [centered, fullWidth, styles.topLeft] },
                            React.createElement(Icon, {
                                style: primaryIconStyle,
                                icon: icons[0],
                                focused: focused
                            })
                        ),
                        React.createElement(
                            View,
                            { style: [centered, fullWidth, styles.topRight] },
                            React.createElement(Icon, {
                                style: secondaryIconStyle,
                                icon: icons[1],
                                focused: focused
                            })
                        )
                    ),
                    React.createElement(
                        View,
                        { style: row },
                        React.createElement(
                            View,
                            { style: [centered, fullWidth, styles.bottomLeft] },
                            React.createElement(Icon, {
                                style: secondaryIconStyle,
                                icon: icons[2],
                                focused: focused
                            })
                        ),
                        React.createElement(
                            View,
                            { style: [centered, fullWidth, styles.bottomRight] },
                            icons[3] && React.createElement(Icon, {
                                style: secondaryIconStyle,
                                icon: icons[3],
                                focused: focused
                            })
                        )
                    )
                );
            }
        }

        throw new Error("Invalid number of icons:", icons.length);
    }
});

var verticalInsetPx = 2;
var horizontalInsetPx = 4;

var styles = StyleSheet.create({
    size: {
        height: iconSizeHeightPx,
        width: iconSizeWidthPx
    },

    // For the three- and four-icon layouts.
    bottomLeft: {
        marginBottom: verticalInsetPx,
        marginLeft: horizontalInsetPx
    },
    topLeft: {
        marginTop: verticalInsetPx,
        marginLeft: horizontalInsetPx
    },
    topRight: {
        marginTop: verticalInsetPx,
        marginRight: horizontalInsetPx
    },
    bottomRight: {
        marginBottom: verticalInsetPx,
        marginRight: horizontalInsetPx
    },

    // For the two-icon layout.
    middleLeft: {
        marginLeft: horizontalInsetPx
    },
    middleRight: {
        marginRight: horizontalInsetPx
    },

    base: {
        fontSize: 18
    },

    secondary: {
        opacity: 0.3
    }
});

module.exports = MultiSymbolGrid;