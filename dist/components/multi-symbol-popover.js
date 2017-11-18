'use strict';

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

var MultiSymbolPopover = React.createClass({
    displayName: 'MultiSymbolPopover',

    propTypes: {
        keys: React.PropTypes.arrayOf(keyConfigPropType)
    },

    render: function render() {
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
});

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