'use strict';

var React = require('react');

var _require = require('../fake-react-native-web'),
    View = _require.View;

var _require2 = require('../index'),
    components = _require2.components;

var Keypad = components.Keypad,
    KeypadInput = components.KeypadInput;


var App = React.createClass({
    displayName: 'App',
    getInitialState: function getInitialState() {
        return {
            keypadElement: null,
            value: ""
        };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        this.props.callbacks.value = function (newVal) {
            if (newVal) {
                _this.setState({ value: newVal });
            } else {
                return _this.state.value;
            }
        };
        this.props.callbacks.blur = function () {
            _this.keypadInput.blur();
        };
    },
    onChange: function onChange(value, cb) {
        //this.setState({ value }, cb);
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    },
    render: function render() {
        var _this2 = this;

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
                        marginBottom: 40
                    }
                },
                React.createElement(KeypadInput, {
                    value: this.props.value,
                    keypadElement: this.state.keypadElement,
                    onChange: this.onChange,
                    onFocus: function onFocus() {
                        return _this2.state.keypadElement.activate();
                    },
                    onBlur: function onBlur() {
                        return _this2.state.keypadElement.dismiss();
                    },
                    ref: function ref(element) {
                        return _this2.keypadInput = element;
                    }
                })
            ),
            React.createElement(Keypad, {
                onElementMounted: function onElementMounted(node) {
                    if (node && !_this2.state.keypadElement) {
                        _this2.setState({ keypadElement: node });
                    }
                }
            })
        );
    }
});

module.exports = App;