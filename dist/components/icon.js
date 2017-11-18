'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * A component that renders an icon for a symbol with the given name.
 */

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var _require = require('aphrodite'),
    StyleSheet = _require.StyleSheet;

var MathIcon = require('./math-icon');
var SvgIcon = require('./svg-icon');
var TextIcon = require('./text-icon');

var _require2 = require('../consts'),
    IconTypes = _require2.IconTypes;

var _require3 = require('./prop-types'),
    iconPropType = _require3.iconPropType;

var _require4 = require('./common-style'),
    gray25 = _require4.gray25;

var focusedColor = '#FFF';
var unfocusedColor = gray25;

var Icon = React.createClass({
    displayName: 'Icon',

    propTypes: {
        focused: React.PropTypes.bool,
        icon: iconPropType.isRequired,
        // An Aphrodite style object, or an array of Aphrodite style objects.
        // Note that custom styles will only be applied to text and math icons
        // (and not SVG icons).
        style: React.PropTypes.any
    },

    mixins: [PureRenderMixin],

    render: function render() {
        var _props = this.props,
            focused = _props.focused,
            icon = _props.icon,
            style = _props.style;


        var styleWithFocus = [focused ? styles.focused : styles.unfocused].concat(_toConsumableArray(Array.isArray(style) ? style : [style]));

        switch (icon.type) {
            case IconTypes.MATH:
                return React.createElement(MathIcon, {
                    math: icon.data,
                    style: styleWithFocus
                });

            case IconTypes.SVG:
                // TODO(charlie): Support passing style objects to `SvgIcon`.
                // This will require migrating the individual icons to use
                // `currentColor` and accept a `className` prop, rather than
                // relying on an explicit color prop.
                return React.createElement(SvgIcon, {
                    name: icon.data,
                    color: focused ? focusedColor : unfocusedColor
                });

            case IconTypes.TEXT:
                return React.createElement(TextIcon, {
                    character: icon.data,
                    style: styleWithFocus
                });
        }

        throw new Error("No icon or symbol provided");
    }
});

var styles = StyleSheet.create({
    unfocused: {
        color: unfocusedColor
    },

    focused: {
        color: focusedColor
    }
});

module.exports = Icon;