'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
/**
 * A component that renders and animates the popovers that appear over the
 * multi-functional keys.
 */

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var KeyConfigs = require('../data/key-configs');
var MultiSymbolPopover = require('./multi-symbol-popover');

var _require = require('./prop-types'),
    boundingBoxPropType = _require.boundingBoxPropType,
    keyConfigPropType = _require.keyConfigPropType,
    popoverPropType = _require.popoverPropType;

// NOTE(charlie): These must be kept in sync with the transition durations and
// classnames specified in popover.css.


var animationTransitionName = 'popover';
var animationDurationMs = 200;

// A container component used to position a popover absolutely at a specific
// position.

var PopoverContainer = function (_React$Component) {
    _inherits(PopoverContainer, _React$Component);

    function PopoverContainer() {
        _classCallCheck(this, PopoverContainer);

        return _possibleConstructorReturn(this, (PopoverContainer.__proto__ || Object.getPrototypeOf(PopoverContainer)).apply(this, arguments));
    }

    _createClass(PopoverContainer, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                bounds = _props.bounds,
                childKeys = _props.childKeys;


            var containerStyle = _extends({
                position: 'absolute'
            }, bounds);

            return React.createElement(
                'div',
                { style: containerStyle },
                React.createElement(MultiSymbolPopover, { keys: childKeys })
            );
        }
    }]);

    return PopoverContainer;
}(React.Component);

PopoverContainer.propTypes = {
    bounds: boundingBoxPropType.isRequired,
    childKeys: PropTypes.arrayOf(keyConfigPropType).isRequired
};

var PopoverManager = function (_React$Component2) {
    _inherits(PopoverManager, _React$Component2);

    function PopoverManager() {
        _classCallCheck(this, PopoverManager);

        return _possibleConstructorReturn(this, (PopoverManager.__proto__ || Object.getPrototypeOf(PopoverManager)).apply(this, arguments));
    }

    _createClass(PopoverManager, [{
        key: 'render',
        value: function render() {
            var popover = this.props.popover;


            return React.createElement(
                ReactCSSTransitionGroup,
                {
                    transitionName: animationTransitionName,
                    transitionEnter: true,
                    transitionLeave: false,
                    transitionEnterTimeout: animationDurationMs
                },
                popover && React.createElement(PopoverContainer, {
                    key: popover.childKeyIds[0],
                    bounds: popover.bounds,
                    childKeys: popover.childKeyIds.map(function (id) {
                        return KeyConfigs[id];
                    })
                })
            );
        }
    }]);

    return PopoverManager;
}(React.Component);

PopoverManager.propTypes = {
    popover: popoverPropType
};


module.exports = PopoverManager;