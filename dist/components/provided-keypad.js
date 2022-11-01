'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var _require = require('react-redux'),
    Provider = _require.Provider;

var KeypadContainer = require('./keypad-container');

var _require2 = require('../actions'),
    activateKeypad = _require2.activateKeypad,
    dismissKeypad = _require2.dismissKeypad,
    configureKeypad = _require2.configureKeypad,
    setCursor = _require2.setCursor,
    setKeyHandler = _require2.setKeyHandler,
    goToPreviousPage = _require2.goToPreviousPage,
    goToNextPage = _require2.goToNextPage;

var createStore = require('../store');

var ProvidedKeypad = function (_React$Component) {
    _inherits(ProvidedKeypad, _React$Component);

    function ProvidedKeypad() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ProvidedKeypad);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProvidedKeypad.__proto__ || Object.getPrototypeOf(ProvidedKeypad)).call.apply(_ref, [this].concat(args))), _this), _this.activate = function () {
            _this.store.dispatch(activateKeypad());
        }, _this.dismiss = function () {
            _this.store.dispatch(dismissKeypad());
        }, _this.configure = function (configuration, cb) {
            _this.store.dispatch(configureKeypad(configuration));

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
        }, _this.setCursor = function (cursor) {
            _this.store.dispatch(setCursor(cursor));
        }, _this.setKeyHandler = function (keyHandler) {
            _this.store.dispatch(setKeyHandler(keyHandler));
        }, _this.changePage = function (previousOrNext) {
            if (previousOrNext === 'previous') return _this.store.dispatch(goToPreviousPage());
            if (previousOrNext === 'next') return _this.store.dispatch(goToNextPage());
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ProvidedKeypad, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.store = createStore();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                _onElementMounted = _props.onElementMounted,
                rest = _objectWithoutProperties(_props, ['onElementMounted']);

            return React.createElement(
                Provider,
                { store: this.store },
                React.createElement(KeypadContainer, _extends({
                    onChangePage: this.changePage,
                    onElementMounted: function onElementMounted(element) {
                        // Append the dispatch methods that we want to expose
                        // externally to the returned React element.
                        var elementWithDispatchMethods = _extends({}, element, {
                            activate: _this2.activate,
                            dismiss: _this2.dismiss,
                            configure: _this2.configure,
                            setCursor: _this2.setCursor,
                            setKeyHandler: _this2.setKeyHandler
                        });
                        _onElementMounted && _onElementMounted(elementWithDispatchMethods);
                    }
                }, rest))
            );
        }
    }]);

    return ProvidedKeypad;
}(React.Component);

ProvidedKeypad.propTypes = {
    onElementMounted: PropTypes.func
};


module.exports = ProvidedKeypad;