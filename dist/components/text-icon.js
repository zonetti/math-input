'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * A component that renders a text-based icon.
 */

var React = require('react');

var _require = require('aphrodite'),
    StyleSheet = _require.StyleSheet;

var _require2 = require('../fake-react-native-web'),
    View = _require2.View,
    Text = _require2.Text;

var _require3 = require('./styles'),
    row = _require3.row,
    centered = _require3.centered;

var _require4 = require('./common-style'),
    iconSizeHeightPx = _require4.iconSizeHeightPx,
    iconSizeWidthPx = _require4.iconSizeWidthPx;

var TextIcon = React.createClass({
    displayName: 'TextIcon',

    propTypes: {
        character: React.PropTypes.string.isRequired,
        style: React.PropTypes.any
    },

    render: function render() {
        var _props = this.props,
            character = _props.character,
            style = _props.style;


        var containerStyle = [row, centered, styles.size, styles.base].concat(_toConsumableArray(Array.isArray(style) ? style : [style]));
        return React.createElement(
            View,
            { style: containerStyle },
            React.createElement(
                Text,
                null,
                character
            )
        );
    }
});

var styles = StyleSheet.create({
    size: {
        height: iconSizeHeightPx,
        width: iconSizeWidthPx
    },

    base: {
        fontFamily: 'Proxima Nova',
        fontSize: 25
    }
});

module.exports = TextIcon;