'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var React = require('react');

var _require = require('aphrodite'),
    StyleSheet = _require.StyleSheet,
    css = _require.css;

var Text = React.createClass({
    displayName: 'Text',

    propTypes: {
        children: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.node), React.PropTypes.node]),
        // The `dynamicStyle` prop is provided for animating dynamic
        // properties, as creating Aphrodite StyleSheets in animation loops is
        // expensive. `dynamicStyle` should be a raw style object, rather than
        // a StyleSheet.
        dynamicStyle: React.PropTypes.any,
        numberOfLines: React.PropTypes.number,
        style: React.PropTypes.any
    },

    render: function render() {
        var _props = this.props,
            numberOfLines = _props.numberOfLines,
            style = _props.style;


        var className = css.apply(undefined, [styles.initial].concat(_toConsumableArray(Array.isArray(style) ? style : [style]), [numberOfLines === 1 && styles.singleLineStyle]));

        return React.createElement(
            'span',
            { className: className, style: this.props.dynamicStyle },
            this.props.children
        );
    }
});

// https://github.com/necolas/react-native-web/blob/master/src/components/Text/index.js
var styles = StyleSheet.create({
    initial: {
        color: 'inherit',
        display: 'inline',
        font: 'inherit',
        margin: 0,
        padding: 0,
        textDecorationLine: 'none',
        wordWrap: 'break-word'
    },
    singleLineStyle: {
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }
});

module.exports = Text;