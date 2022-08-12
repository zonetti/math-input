'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var _require = require('aphrodite'),
    StyleSheet = _require.StyleSheet,
    css = _require.css;

var Text = function (_React$Component) {
    _inherits(Text, _React$Component);

    function Text() {
        _classCallCheck(this, Text);

        return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
    }

    _createClass(Text, [{
        key: 'render',
        value: function render() {
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
    }]);

    return Text;
}(React.Component);

// https://github.com/necolas/react-native-web/blob/master/src/components/Text/index.js


Text.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    // The `dynamicStyle` prop is provided for animating dynamic
    // properties, as creating Aphrodite StyleSheets in animation loops is
    // expensive. `dynamicStyle` should be a raw style object, rather than
    // a StyleSheet.
    dynamicStyle: PropTypes.any,
    numberOfLines: PropTypes.number,
    style: PropTypes.any
};
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