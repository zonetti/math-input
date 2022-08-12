'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var MathIcon = function (_React$Component) {
    _inherits(MathIcon, _React$Component);

    function MathIcon() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MathIcon);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MathIcon.__proto__ || Object.getPrototypeOf(MathIcon)).call.apply(_ref, [this].concat(args))), _this), _this._renderMath = function () {
            var math = _this.props.math;

            katex.render(math, ReactDOM.findDOMNode(_this));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MathIcon, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._renderMath();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.math !== this.props.math) {
                this._renderMath();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var style = this.props.style;


            var containerStyle = [row, centered, styles.size, styles.base].concat(_toConsumableArray(Array.isArray(style) ? style : [style]));

            return React.createElement(View, { style: containerStyle });
        }
    }]);

    return MathIcon;
}(React.Component);

MathIcon.propTypes = {
    math: PropTypes.string.isRequired,
    style: PropTypes.any
};


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