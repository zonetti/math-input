'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * A small triangular decal to sit in the corner of a parent component.
 */

var React = require('react');

var _require = require('aphrodite'),
    StyleSheet = _require.StyleSheet;

var _require2 = require('../fake-react-native-web'),
    View = _require2.View;

var _require3 = require('./common-style'),
    gray25 = _require3.gray25;

var CornerDecal = React.createClass({
    displayName: 'CornerDecal',

    propTypes: {
        style: React.PropTypes.any
    },

    render: function render() {
        var style = this.props.style;


        var containerStyle = [styles.container].concat(_toConsumableArray(Array.isArray(style) ? style : [style]));

        return React.createElement(
            View,
            { style: containerStyle },
            React.createElement(
                'svg',
                {
                    width: triangleSizePx,
                    height: triangleSizePx,
                    viewBox: '4 4 8 8'
                },
                React.createElement('path', {
                    fill: gray25,
                    opacity: '0.3',
                    d: 'M5.29289322,5.70710678 L10.2928932,10.7071068 C10.9228581,11.3370716 12,10.8909049 12,10 L12,5 C12,4.44771525 11.5522847,4 11,4 L6,4 C5.10909515,4 4.66292836,5.07714192 5.29289322,5.70710678 Z' // @Nolint
                })
            )
        );
    }
});

var triangleSizePx = 7;

var styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        right: 0,
        width: triangleSizePx,
        height: triangleSizePx
    }
});

module.exports = CornerDecal;