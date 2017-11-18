'use strict';

/**
 * A keypad that includes the digits, as well as the symbols required to deal
 * with fractions, decimals, and percents.
 */

var React = require('react');

var _require = require('react-redux'),
    connect = _require.connect;

var _require2 = require('../fake-react-native-web'),
    View = _require2.View;

var Keypad = require('./keypad');
var TouchableKeypadButton = require('./touchable-keypad-button');

var _require3 = require('./styles'),
    row = _require3.row,
    roundedTopLeft = _require3.roundedTopLeft,
    roundedTopRight = _require3.roundedTopRight;

var _require4 = require('../consts'),
    BorderStyles = _require4.BorderStyles;

var CursorContexts = require('./input/cursor-contexts');

var _require5 = require('./prop-types'),
    cursorContextPropType = _require5.cursorContextPropType;

var KeyConfigs = require('../data/key-configs');

var FractionKeypad = React.createClass({
    displayName: 'FractionKeypad',

    propTypes: {
        cursorContext: cursorContextPropType.isRequired,
        dynamicJumpOut: React.PropTypes.bool,
        roundTopLeft: React.PropTypes.bool,
        roundTopRight: React.PropTypes.bool
    },

    statics: {
        rows: 4,
        columns: 4,
        // Since we include a two-key popover in the top-right, when the popover
        // is visible, the keypad will expand to fill the equivalent of five
        // rows vertically.
        maxVisibleRows: 5,
        numPages: 1
    },

    render: function render() {
        var _props = this.props,
            cursorContext = _props.cursorContext,
            dynamicJumpOut = _props.dynamicJumpOut,
            roundTopLeft = _props.roundTopLeft,
            roundTopRight = _props.roundTopRight;


        var dismissOrJumpOutKey = void 0;
        if (dynamicJumpOut) {
            switch (cursorContext) {
                case CursorContexts.IN_PARENS:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_PARENTHESES;
                    break;

                case CursorContexts.IN_SUPER_SCRIPT:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_EXPONENT;
                    break;

                case CursorContexts.IN_SUB_SCRIPT:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_BASE;
                    break;

                case CursorContexts.BEFORE_FRACTION:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_INTO_NUMERATOR;
                    break;

                case CursorContexts.IN_NUMERATOR:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_NUMERATOR;
                    break;

                case CursorContexts.IN_DENOMINATOR:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_DENOMINATOR;
                    break;

                case CursorContexts.NONE:
                default:
                    dismissOrJumpOutKey = KeyConfigs.DISMISS;
                    break;
            }
        } else {
            dismissOrJumpOutKey = KeyConfigs.DISMISS;
        }

        return React.createElement(
            Keypad,
            null,
            React.createElement(
                View,
                { style: row },
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.NUM_7,
                    borders: BorderStyles.NONE,
                    style: roundTopLeft && roundedTopLeft
                }),
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.NUM_8,
                    borders: BorderStyles.NONE
                }),
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.NUM_9,
                    borders: BorderStyles.NONE
                }),
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.FRAC_MULTI,
                    disabled:
                    // NOTE(charlie): It's only sufficient to use
                    // `IN_NUMERATOR` and `IN_DENOMINATOR` here because we
                    // don't support parentheses in this keypad. If we did,
                    // then when the cursor was inside a parenthetical
                    // expression in a numerator or denominator, this check
                    // would fail.
                    cursorContext === CursorContexts.IN_NUMERATOR || cursorContext === CursorContexts.IN_DENOMINATOR,
                    style: roundTopRight && roundedTopRight
                })
            ),
            React.createElement(
                View,
                { style: row },
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.NUM_4,
                    borders: BorderStyles.NONE
                }),
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.NUM_5,
                    borders: BorderStyles.NONE
                }),
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.NUM_6,
                    borders: BorderStyles.NONE
                }),
                React.createElement(TouchableKeypadButton, { keyConfig: KeyConfigs.PERCENT })
            ),
            React.createElement(
                View,
                { style: row },
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.NUM_1,
                    borders: BorderStyles.BOTTOM
                }),
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.NUM_2,
                    borders: BorderStyles.NONE
                }),
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.NUM_3,
                    borders: BorderStyles.BOTTOM
                }),
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.BACKSPACE,
                    borders: BorderStyles.LEFT
                })
            ),
            React.createElement(
                View,
                { style: row },
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.NEGATIVE,
                    borders: BorderStyles.NONE
                }),
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.NUM_0,
                    borders: BorderStyles.LEFT
                }),
                React.createElement(TouchableKeypadButton, {
                    keyConfig: KeyConfigs.DECIMAL,
                    borders: BorderStyles.LEFT
                }),
                React.createElement(TouchableKeypadButton, {
                    keyConfig: dismissOrJumpOutKey,
                    borders: BorderStyles.LEFT
                })
            )
        );
    }
});

var mapStateToProps = function mapStateToProps(state) {
    return {
        cursorContext: state.input.cursor.context,
        dynamicJumpOut: !state.layout.navigationPadEnabled
    };
};

module.exports = connect(mapStateToProps)(FractionKeypad);