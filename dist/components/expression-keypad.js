"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require("prop-types");
/**
 * A keypad that includes all of the expression symbols.
 */

var React = require("react");

var _require = require("react-redux"),
    connect = _require.connect;

var _require2 = require("aphrodite"),
    StyleSheet = _require2.StyleSheet;

var _require3 = require("../fake-react-native-web"),
    View = _require3.View;

var ManyKeypadButton = require("./many-keypad-button");
var TouchableKeypadButton = require("./touchable-keypad-button");

var _require4 = require("./styles"),
    row = _require4.row,
    column = _require4.column,
    oneColumn = _require4.oneColumn,
    fullWidth = _require4.fullWidth,
    roundedTopLeft = _require4.roundedTopLeft,
    roundedTopRight = _require4.roundedTopRight;

var _require5 = require("../consts"),
    BorderStyles = _require5.BorderStyles;

var _require6 = require("./common-style"),
    valueGrey = _require6.valueGrey;

var _require7 = require("./prop-types"),
    cursorContextPropType = _require7.cursorContextPropType,
    keyIdPropType = _require7.keyIdPropType;

var KeyConfigs = require("../data/key-configs");
var CursorContexts = require("./input/cursor-contexts");
var ManyPagesKeypad = require("./many-pages-keypad");

var ExpressionKeypad = function (_React$Component) {
  _inherits(ExpressionKeypad, _React$Component);

  function ExpressionKeypad() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ExpressionKeypad);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExpressionKeypad.__proto__ || Object.getPrototypeOf(ExpressionKeypad)).call.apply(_ref, [this].concat(args))), _this), _this._getDismissOrJumpOutKey = function () {
      var _this$props = _this.props,
          cursorContext = _this$props.cursorContext,
          dynamicJumpOut = _this$props.dynamicJumpOut;

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

      return dismissOrJumpOutKey;
    }, _this._renderFirstPage = function () {
      var _this$props2 = _this.props,
          extraKeys = _this$props2.extraKeys,
          roundTopLeft = _this$props2.roundTopLeft,
          roundTopRight = _this$props2.roundTopRight;


      var leftPageStyle = [row, fullWidth, styles.pageBackground, roundTopLeft && roundedTopLeft];

      var columns = [React.createElement(
        View,
        { key: 0, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.EXP,
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
      ), React.createElement(
        View,
        { key: 1, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.SUB,
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
      ), React.createElement(
        View,
        { key: 2, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.SUPSUB,
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
      ), React.createElement(
        View,
        { key: 3, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.GEQ,
          borders: BorderStyles.LEFT
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.EQUAL,
          borders: BorderStyles.LEFT
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.LEQ,
          borders: BorderStyles.ALL
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.LEFT_PAREN,
          borders: BorderStyles.LEFT
        })
      ), React.createElement(
        View,
        { key: 4, style: [column, oneColumn] },
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
      ), React.createElement(
        View,
        { key: 5, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NUM_7,
          borders: BorderStyles.LEFT
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NUM_4,
          borders: BorderStyles.LEFT
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NUM_1,
          borders: BorderStyles.ALL
        }),
        React.createElement(ManyKeypadButton, { keys: extraKeys, borders: BorderStyles.LEFT })
      ), React.createElement(
        View,
        { key: 6, style: [column, oneColumn] },
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
      ), React.createElement(
        View,
        { key: 7, style: [column, oneColumn] },
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
      ), React.createElement(
        View,
        { key: 8, style: [column, oneColumn] },
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
      ), React.createElement(
        View,
        { key: 9, style: [column, oneColumn] },
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
          keyConfig: _this._getDismissOrJumpOutKey(),
          borders: BorderStyles.LEFT
        })
      )];

      return {
        content: React.createElement(
          View,
          { key: "pag1", style: leftPageStyle },
          columns.map(function (col) {
            return col;
          })
        ),
        title: "Geral"
      };
    }, _this._renderSecondPage = function () {
      var roundTopLeft = _this.props.roundTopLeft;


      var middlePageStyle = [row, fullWidth, styles.pageBackground];
      var columns = [React.createElement(
        View,
        { key: 0, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['α'],
          borders: BorderStyles.NONE,
          style: roundTopLeft && roundedTopLeft
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['ϴ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Ο'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['τ'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 1, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['β'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['θ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['ο'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['υ'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 2, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Γ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['ι'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Π'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Φ'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 3, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['γ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['k'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['π'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['φ'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 4, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Δ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Λ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Ρ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['χ'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 5, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['δ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['λ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['ρ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Ψ'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 6, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Ε'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['μ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Σ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['ψ'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 7, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['ε'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['ν'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['σ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Ω'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 8, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['ζ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Ξ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Τ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['ω'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 9, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['η'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['ξ'],
          borders: BorderStyles.BOTTOM
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.BACKSPACE,
          borders: BorderStyles.ALL
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: _this._getDismissOrJumpOutKey(),
          borders: BorderStyles.LEFT
        })
      )];

      return {
        content: React.createElement(
          View,
          { key: "pag2", style: middlePageStyle },
          columns.map(function (col) {
            return col;
          })
        ),
        title: "Letras gregas"
      };
    }, _this._renderThirdPage = function () {
      var middlePageStyle = [row, fullWidth, styles.pageBackground];

      var columns = [React.createElement(
        View,
        { key: 0, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['←'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['↑'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 1, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['→'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['↓'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 2, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['↖'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['↗'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 3, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['↘'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['↙'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 4, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['↰'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['↱'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 5, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⇦'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['↔'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 6, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⇨'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['↕'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 7, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⇧'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 8, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⇩'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 9, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⇿'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.NOOP,
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.BACKSPACE,
          borders: BorderStyles.ALL
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: _this._getDismissOrJumpOutKey(),
          borders: BorderStyles.LEFT
        })
      )];

      return {
        content: React.createElement(
          View,
          { key: "pag3", style: middlePageStyle },
          columns.map(function (col) {
            return col;
          })
        ),
        title: "Setas e relações"
      };
    }, _this._renderFourthPage = function () {
      var _this$props3 = _this.props,
          roundTopLeft = _this$props3.roundTopLeft,
          roundTopRight = _this$props3.roundTopRight;


      var rightPageStyle = [row, fullWidth, styles.pageBackground, roundTopRight && roundedTopRight];

      var columns = [React.createElement(
        View,
        { key: 0, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∀'],
          borders: BorderStyles.NONE,
          style: roundTopLeft && roundedTopLeft
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['Δ'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∞'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∴'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 1, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∁'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∇'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∂'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∵'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 2, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∪'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⋃'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⊃'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⊂'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 3, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∩'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⋂'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⊅'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⊄'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 4, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∈'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∋'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∓'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['±'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 5, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∉'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∌'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∫'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∑'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 6, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∅'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⊕'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⊙'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['⊗'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 7, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∕'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∃'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['≠'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['≡'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 8, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∖'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∘'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∠'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['≅'],
          borders: BorderStyles.NONE
        })
      ), React.createElement(
        View,
        { key: 9, style: [column, oneColumn] },
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['|'],
          borders: BorderStyles.NONE
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs['∙'],
          borders: BorderStyles.BOTTOM
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: KeyConfigs.BACKSPACE,
          borders: BorderStyles.ALL
        }),
        React.createElement(TouchableKeypadButton, {
          keyConfig: _this._getDismissOrJumpOutKey(),
          borders: BorderStyles.LEFT
        })
      )];

      return {
        content: React.createElement(
          View,
          { key: "pag4", style: rightPageStyle },
          columns.map(function (col) {
            return col;
          })
        ),
        title: "Símbolos matemáticos"
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // Though we include an infinite-key popover in the bottom-left, it's
  // assumed that we don't need to accommodate cases in which that key
  // contains more than four children.


  _createClass(ExpressionKeypad, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          currentPage = _props.currentPage,
          onChangePage = _props.onChangePage;


      var firstPage = this._renderFirstPage();
      var secondPage = this._renderSecondPage();
      var thirdPage = this._renderThirdPage();
      var fourthPage = this._renderFourthPage();

      return React.createElement(ManyPagesKeypad, {
        onChangePage: onChangePage,
        currentPage: currentPage,
        pages: [firstPage, secondPage, thirdPage, fourthPage]
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
  roundTopRight: PropTypes.bool,
  onChangePage: PropTypes.func
};
ExpressionKeypad.rows = 4;
ExpressionKeypad.columns = 10;
ExpressionKeypad.maxVisibleRows = 4;
ExpressionKeypad.numPages = 4;


var styles = StyleSheet.create({
  // NOTE(charlie): These backgrounds are applied to as to fill in some
  // unfortunate 'cracks' in the layout. However, not all keys in the first
  // page use this background color (namely, the 'command' keys, backspace and
  // dismiss).
  // TODO(charlie): Apply the proper background between the 'command' keys.
  pageBackground: {
    backgroundColor: valueGrey
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