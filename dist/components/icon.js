'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
/**
 * A component that renders an icon for a symbol with the given name.
 */

var React = require('react');

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

var Icon = function (_React$PureComponent) {
    _inherits(Icon, _React$PureComponent);

    function Icon() {
        _classCallCheck(this, Icon);

        return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
    }

    _createClass(Icon, [{
        key: 'render',
        value: function render() {
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
    }]);

    return Icon;
}(React.PureComponent);

Icon.propTypes = {
    focused: PropTypes.bool,
    icon: iconPropType.isRequired,
    // An Aphrodite style object, or an array of Aphrodite style objects.
    // Note that custom styles will only be applied to text and math icons
    // (and not SVG icons).
    style: PropTypes.any
};


var styles = StyleSheet.create({
    unfocused: {
        color: unfocusedColor
    },

    focused: {
        color: focusedColor
    }
});

module.exports = Icon;