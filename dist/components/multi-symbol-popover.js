'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
/**
 * A popover that renders a set of keys floating above the page.
 */

var React = require('react');

var _require = require('aphrodite'),
    StyleSheet = _require.StyleSheet;

var _require2 = require('../fake-react-native-web'),
    View = _require2.View;

var _require3 = require('./prop-types'),
    keyConfigPropType = _require3.keyConfigPropType;

var _require4 = require('../consts'),
    BorderStyles = _require4.BorderStyles;

var zIndexes = require('./z-indexes');

var MultiSymbolPopover = function (_React$Component) {
    _inherits(MultiSymbolPopover, _React$Component);

    function MultiSymbolPopover() {
        _classCallCheck(this, MultiSymbolPopover);

        return _possibleConstructorReturn(this, (MultiSymbolPopover.__proto__ || Object.getPrototypeOf(MultiSymbolPopover)).apply(this, arguments));
    }

    _createClass(MultiSymbolPopover, [{
        key: 'render',
        value: function render() {
            var keys = this.props.keys;

            // TODO(charlie): We have to require this lazily because of a cyclic
            // dependence in our components.

            var TouchableKeypadButton = require('./touchable-keypad-button');
            return React.createElement(
                View,
                { style: styles.container },
                keys.map(function (key) {
                    return React.createElement(TouchableKeypadButton, {
                        key: key.id,
                        keyConfig: key,
                        borders: BorderStyles.NONE
                    });
                })
            );
        }
    }]);

    return MultiSymbolPopover;
}(React.Component);

MultiSymbolPopover.propTypes = {
    keys: PropTypes.arrayOf(keyConfigPropType)
};


var styles = StyleSheet.create({
    container: {
        flexDirection: 'column-reverse',
        position: 'relative',
        width: '100%',
        borderRadius: 2,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
        zIndex: zIndexes.popover
    },

    popoverButton: {
        backgroundColor: '#FFF',
        borderWidth: 0
    }
});

module.exports = MultiSymbolPopover;