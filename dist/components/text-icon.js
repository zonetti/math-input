'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
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

var TextIcon = function (_React$Component) {
    _inherits(TextIcon, _React$Component);

    function TextIcon() {
        _classCallCheck(this, TextIcon);

        return _possibleConstructorReturn(this, (TextIcon.__proto__ || Object.getPrototypeOf(TextIcon)).apply(this, arguments));
    }

    _createClass(TextIcon, [{
        key: 'render',
        value: function render() {
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
    }]);

    return TextIcon;
}(React.Component);

TextIcon.propTypes = {
    character: PropTypes.string.isRequired,
    style: PropTypes.any
};


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