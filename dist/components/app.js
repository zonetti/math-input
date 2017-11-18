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
    render: function render() {
        var _this = this;

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
                    value: this.state.value,
                    keypadElement: this.state.keypadElement,
                    onChange: function onChange(value, cb) {
                        return _this.setState({ value: value }, cb);
                    },
                    onFocus: function onFocus() {
                        return _this.state.keypadElement.activate();
                    },
                    onBlur: function onBlur() {
                        return _this.state.keypadElement.dismiss();
                    }
                })
            ),
            React.createElement(Keypad, {
                onElementMounted: function onElementMounted(node) {
                    if (node && !_this.state.keypadElement) {
                        _this.setState({ keypadElement: node });
                    }
                }
            })
        );
    }
});

module.exports = App;