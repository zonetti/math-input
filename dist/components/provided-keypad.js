'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');

var _require = require('react-redux'),
    Provider = _require.Provider;

var KeypadContainer = require('./keypad-container');

var _require2 = require('../actions'),
    activateKeypad = _require2.activateKeypad,
    dismissKeypad = _require2.dismissKeypad,
    configureKeypad = _require2.configureKeypad,
    _setCursor = _require2.setCursor,
    _setKeyHandler = _require2.setKeyHandler;

var createStore = require('../store');

var ProvidedKeypad = React.createClass({
    displayName: 'ProvidedKeypad',

    propTypes: {
        onElementMounted: React.PropTypes.func
    },

    componentWillMount: function componentWillMount() {
        this.store = createStore();
    },
    activate: function activate() {
        this.store.dispatch(activateKeypad());
    },
    dismiss: function dismiss() {
        this.store.dispatch(dismissKeypad());
    },
    configure: function configure(configuration, cb) {
        this.store.dispatch(configureKeypad(configuration));

        // HACK(charlie): In Perseus, triggering a focus causes the keypad to
        // animate into view and re-configure. We'd like to provide the option
        // to re-render the re-configured keypad before animating it into view,
        // to avoid jank in the animation. As such, we support passing a
        // callback into `configureKeypad`. However, implementing this properly
        // would require middleware, etc., so we just hack it on with
        // `setTimeout` for now.
        setTimeout(function () {
            return cb && cb();
        });
    },
    setCursor: function setCursor(cursor) {
        this.store.dispatch(_setCursor(cursor));
    },
    setKeyHandler: function setKeyHandler(keyHandler) {
        this.store.dispatch(_setKeyHandler(keyHandler));
    },
    render: function render() {
        var _this = this;

        var _props = this.props,
            _onElementMounted = _props.onElementMounted,
            rest = _objectWithoutProperties(_props, ['onElementMounted']);

        return React.createElement(
            Provider,
            { store: this.store },
            React.createElement(KeypadContainer, _extends({
                onElementMounted: function onElementMounted(element) {
                    // Append the dispatch methods that we want to expose
                    // externally to the returned React element.
                    var elementWithDispatchMethods = _extends({}, element, {
                        activate: _this.activate,
                        dismiss: _this.dismiss,
                        configure: _this.configure,
                        setCursor: _this.setCursor,
                        setKeyHandler: _this.setKeyHandler
                    });
                    _onElementMounted && _onElementMounted(elementWithDispatchMethods);
                }
            }, rest))
        );
    }
});

module.exports = ProvidedKeypad;