'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
/**
 * A keypad that includes all of the expression symbols.
 */

var React = require('react');

var _require = require('react-redux'),
    connect = _require.connect;

var _require2 = require('aphrodite'),
    StyleSheet = _require2.StyleSheet;

var _require3 = require('../fake-react-native-web'),
    View = _require3.View;

var TwoPageKeypad = require('./two-page-keypad');
var ManyKeypadButton = require('./many-keypad-button');
var TouchableKeypadButton = require('./touchable-keypad-button');

var _require4 = require('./styles'),
    row = _require4.row,
    column = _require4.column,
    oneColumn = _require4.oneColumn,
    fullWidth = _require4.fullWidth,
    roundedTopLeft = _require4.roundedTopLeft,
    roundedTopRight = _require4.roundedTopRight;

var _require5 = require('../consts'),
    BorderStyles = _require5.BorderStyles;

var _require6 = require('./common-style'),
    valueGrey = _require6.valueGrey,
    controlGrey = _require6.controlGrey;

var _require7 = require('./prop-types'),
    cursorContextPropType = _require7.cursorContextPropType,
    keyIdPropType = _require7.keyIdPropType;

var KeyConfigs = require('../data/key-configs');
var CursorContexts = require('./input/cursor-contexts');

var ExpressionKeypad = function (_React$Component) {
    _inherits(ExpressionKeypad, _React$Component);

    function ExpressionKeypad() {
        _classCallCheck(this, ExpressionKeypad);

        return _possibleConstructorReturn(this, (ExpressionKeypad.__proto__ || Object.getPrototypeOf(ExpressionKeypad)).apply(this, arguments));
    }

    _createClass(ExpressionKeypad, [{
        key: 'render',


        // Though we include an infinite-key popover in the bottom-left, it's
        // assumed that we don't need to accommodate cases in which that key
        // contains more than four children.
        value: function render() {
            var _props = this.props,
                currentPage = _props.currentPage,
                cursorContext = _props.cursorContext,
                dynamicJumpOut = _props.dynamicJumpOut,
                extraKeys = _props.extraKeys,
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

            var rightPageStyle = [row, fullWidth, styles.rightPage, roundTopRight && roundedTopRight];
            var rightPage = React.createElement(
                View,
                { style: rightPageStyle },
                React.createElement(
                    View,
                    { style: [column, oneColumn] },
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.NUM_7,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.NUM_4,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.NUM_1,
                        borders: BorderStyles.BOTTOM
                    }),
                    React.createElement(ManyKeypadButton, {
                        keys: extraKeys,
                        borders: BorderStyles.NONE
                    })
                ),
                React.createElement(
                    View,
                    { style: [column, oneColumn] },
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.NUM_8,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.NUM_5,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.NUM_2,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.NUM_0,
                        borders: BorderStyles.LEFT
                    })
                ),
                React.createElement(
                    View,
                    { style: [column, oneColumn] },
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.NUM_9,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.NUM_6,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.NUM_3,
                        borders: BorderStyles.BOTTOM
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.DECIMAL,
                        borders: BorderStyles.LEFT
                    })
                ),
                React.createElement(
                    View,
                    { style: [column, oneColumn] },
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.DIVIDE,
                        borders: BorderStyles.LEFT
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.TIMES,
                        borders: BorderStyles.LEFT
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.MINUS,
                        borders: BorderStyles.LEFT
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.PLUS,
                        borders: BorderStyles.LEFT
                    })
                ),
                React.createElement(
                    View,
                    { style: [column, oneColumn] },
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.FRAC_INCLUSIVE,
                        style: roundTopRight && roundedTopRight
                    }),
                    React.createElement(TouchableKeypadButton, { keyConfig: KeyConfigs.CDOT }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.BACKSPACE,
                        borders: BorderStyles.LEFT
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: dismissOrJumpOutKey,
                        borders: BorderStyles.LEFT
                    })
                )
            );

            var leftPageStyle = [row, fullWidth, styles.leftPage, roundTopLeft && roundedTopLeft];
            var leftPage = React.createElement(
                View,
                { style: leftPageStyle },
                React.createElement(
                    View,
                    { style: [column, oneColumn] },
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.EXP_2,
                        borders: BorderStyles.NONE,
                        style: roundTopLeft && roundedTopLeft
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.SQRT,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.LOG,
                        borders: BorderStyles.BOTTOM
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.SIN,
                        borders: BorderStyles.NONE
                    })
                ),
                React.createElement(
                    View,
                    { style: [column, oneColumn] },
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.EXP_3,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.CUBE_ROOT,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.LN,
                        borders: BorderStyles.BOTTOM
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.COS,
                        borders: BorderStyles.NONE
                    })
                ),
                React.createElement(
                    View,
                    { style: [column, oneColumn] },
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.EXP,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.RADICAL,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.LOG_N,
                        borders: BorderStyles.BOTTOM
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.TAN,
                        borders: BorderStyles.NONE
                    })
                ),
                React.createElement(
                    View,
                    { style: [column, oneColumn] },
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.GEQ,
                        borders: BorderStyles.LEFT
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.EQUAL,
                        borders: BorderStyles.LEFT
                    }),
                    React.createElement(TouchableKeypadButton, { keyConfig: KeyConfigs.LEQ }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.LEFT_PAREN,
                        borders: BorderStyles.LEFT
                    })
                ),
                React.createElement(
                    View,
                    { style: [column, oneColumn] },
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.GT,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.NEQ,
                        borders: BorderStyles.NONE
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.LT,
                        borders: BorderStyles.BOTTOM
                    }),
                    React.createElement(TouchableKeypadButton, {
                        keyConfig: KeyConfigs.RIGHT_PAREN,
                        borders: BorderStyles.NONE
                    })
                )
            );

            return React.createElement(TwoPageKeypad, {
                currentPage: currentPage,
                rightPage: rightPage,
                leftPage: leftPage
            });
        }
    }]);

    return ExpressionKeypad;
}(React.Component);

ExpressionKeypad.propTypes = {
    currentPage: PropTypes.number.isRequired,
    cursorContext: cursorContextPropType.isRequired,
    dynamicJumpOut: PropTypes.bool,
    extraKeys: PropTypes.arrayOf(keyIdPropType),
    roundTopLeft: PropTypes.bool,
    roundTopRight: PropTypes.bool
};
ExpressionKeypad.rows = 4;
ExpressionKeypad.columns = 5;
ExpressionKeypad.maxVisibleRows = 4;
ExpressionKeypad.numPages = 2;


var styles = StyleSheet.create({
    // NOTE(charlie): These backgrounds are applied to as to fill in some
    // unfortunate 'cracks' in the layout. However, not all keys in the first
    // page use this background color (namely, the 'command' keys, backspace and
    // dismiss).
    // TODO(charlie): Apply the proper background between the 'command' keys.
    rightPage: {
        backgroundColor: valueGrey
    },

    leftPage: {
        backgroundColor: controlGrey
    }
});

var mapStateToProps = function mapStateToProps(state) {
    return {
        currentPage: state.pager.currentPage,
        cursorContext: state.input.cursor.context,
        dynamicJumpOut: !state.layout.navigationPadEnabled
    };
};

module.exports = connect(mapStateToProps)(ExpressionKeypad);