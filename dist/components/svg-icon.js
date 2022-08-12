'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
/**
 * A component that renders a single SVG icon.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var Iconography = require('./iconography');

var SvgIcon = function (_React$Component) {
    _inherits(SvgIcon, _React$Component);

    function SvgIcon() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SvgIcon);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SvgIcon.__proto__ || Object.getPrototypeOf(SvgIcon)).call.apply(_ref, [this].concat(args))), _this), _this._addFillRule = function () {
            // TODO(kevinb) remove this when we upgrade to React 15.
            var node = ReactDOM.findDOMNode(_this);
            if (node instanceof SVGElement) {
                var firstGroup = node.querySelector('g');
                firstGroup.setAttributeNS(null, 'fill-rule', 'evenodd');
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SvgIcon, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._addFillRule();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.name !== this.props.name) {
                this._addFillRule();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                color = _props.color,
                name = _props.name;


            var SvgForName = Iconography[name];
            return React.createElement(SvgForName, { color: color });
        }
    }]);

    return SvgIcon;
}(React.Component);

SvgIcon.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};


module.exports = SvgIcon;