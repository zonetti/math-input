'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var PropTypes = require('prop-types');
/**
 * A component that renders an icon with math (via KaTeX).
 */

var React = require('react');
var ReactDOM = require('react-dom');

var _require = require('aphrodite'),
    StyleSheet = _require.StyleSheet;

var katex = require('katex');

var _require2 = require('../fake-react-native-web'),
    View = _require2.View;

var _require3 = require('./styles'),
    row = _require3.row,
    centered = _require3.centered;

var _require4 = require('./common-style'),
    iconSizeHeightPx = _require4.iconSizeHeightPx,
    iconSizeWidthPx = _require4.iconSizeWidthPx;

var MathIcon = React.createClass({
    displayName: 'MathIcon',

    propTypes: {
        math: PropTypes.string.isRequired,
        style: PropTypes.any
    },

    componentDidMount: function componentDidMount() {
        this._renderMath();
    },
    componentDidUpdate: function componentDidUpdate(prevProps) {
        if (prevProps.math !== this.props.math) {
            this._renderMath();
        }
    },
    _renderMath: function _renderMath() {
        var math = this.props.math;

        katex.render(math, ReactDOM.findDOMNode(this));
    },
    render: function render() {
        var style = this.props.style;


        var containerStyle = [row, centered, styles.size, styles.base].concat(_toConsumableArray(Array.isArray(style) ? style : [style]));

        return React.createElement(View, { style: containerStyle });
    }
});

var styles = StyleSheet.create({
    size: {
        height: iconSizeHeightPx,
        width: iconSizeWidthPx
    },

    base: {
        fontSize: 25
    }
});

module.exports = MathIcon;