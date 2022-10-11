'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var _require = require('../fake-react-native-web'),
    View = _require.View;

var _require2 = require('../index'),
    components = _require2.components;

var Keypad = components.Keypad,
    KeypadInput = components.KeypadInput;

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, App);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            keypadElement: null,
            value: ""
        }, _this.onChange = function (value, cb) {
            //this.setState({ value }, cb);
            if (_this.props.onChange) {
                _this.props.onChange(value);
            }
        }, _this.focus = function () {
            _this.keypadInput.focus(true);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.props.callbacks.value = function (newVal) {
                if (newVal) {
                    _this2.setState({ value: newVal });
                } else {
                    return _this2.state.value;
                }
            };
            this.props.callbacks.blur = function () {
                _this2.keypadInput.blur();
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                View,
                null,
                React.createElement(
                    'div',
                    {
                        style: {
                            marginTop: 10,
                            marginLeft: 20,
                            marginRight: 20,
                            marginBottom: 15
                        }
                    },
                    React.createElement(KeypadInput, {
                        borderColor: this.props.borderColor,
                        value: this.props.value,
                        keypadElement: this.state.keypadElement,
                        onChange: this.onChange,
                        onFocus: function onFocus() {
                            return _this3.state.keypadElement.activate();
                        },
                        onBlur: function onBlur() {
                            return _this3.state.keypadElement.dismiss();
                        },
                        ref: function ref(element) {
                            return _this3.keypadInput = element;
                        }
                    })
                ),
                React.createElement(Keypad, {
                    onElementMounted: function onElementMounted(node) {
                        if (node && !_this3.state.keypadElement) {
                            _this3.setState({ keypadElement: node });
                        }
                    }
                })
            );
        }
    }]);

    return App;
}(React.Component);

module.exports = App;