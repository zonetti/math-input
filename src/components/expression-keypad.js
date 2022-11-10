const PropTypes = require("prop-types");
/**
 * A keypad that includes all of the expression symbols.
 */

const React = require("react");
const { connect } = require("react-redux");
const { StyleSheet } = require("aphrodite");

const { View } = require("../fake-react-native-web");
const ManyKeypadButton = require("./many-keypad-button");
const TouchableKeypadButton = require("./touchable-keypad-button");
const {
  row,
  column,
  oneColumn,
  fullWidth,
  roundedTopLeft,
  roundedTopRight,
} = require("./styles");
const { BorderStyles } = require("../consts");
const { valueGrey } = require("./common-style");
const { cursorContextPropType, keyIdPropType } = require("./prop-types");
const KeyConfigs = require("../data/key-configs");
const CursorContexts = require("./input/cursor-contexts");
const ManyPagesKeypad = require("./many-pages-keypad");

class ExpressionKeypad extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    cursorContext: cursorContextPropType.isRequired,
    dynamicJumpOut: PropTypes.bool,
    extraKeys: PropTypes.arrayOf(keyIdPropType),
    roundTopLeft: PropTypes.bool,
    roundTopRight: PropTypes.bool,
    onChangePage: PropTypes.func,
  };

  static rows = 4;
  static columns = 10;

  // Though we include an infinite-key popover in the bottom-left, it's
  // assumed that we don't need to accommodate cases in which that key
  // contains more than four children.
  static maxVisibleRows = 4;
  static numPages = 4;

  _getDismissOrJumpOutKey = () => {
    const { cursorContext, dynamicJumpOut } = this.props;
    let dismissOrJumpOutKey;
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
  };

  _renderFirstPage = () => {
    const { extraKeys, roundTopLeft, roundTopRight } = this.props;

    const leftPageStyle = [
      row,
      fullWidth,
      styles.pageBackground,
      roundTopLeft && roundedTopLeft,
    ];

    const columns = [
      <View key={0} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs.EXP}
          borders={BorderStyles.NONE}
          style={roundTopLeft && roundedTopLeft}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.SQRT}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.LOG}
          borders={BorderStyles.BOTTOM}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.SIN}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={1} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs.SUB}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.CUBE_ROOT}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.LN}
          borders={BorderStyles.BOTTOM}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.COS}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={2} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs.SUPSUB}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.RADICAL}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.LOG_N}
          borders={BorderStyles.BOTTOM}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.TAN}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={3} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs.GEQ}
          borders={BorderStyles.LEFT}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.EQUAL}
          borders={BorderStyles.LEFT}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.LEQ}
          borders={BorderStyles.ALL}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.LEFT_PAREN}
          borders={BorderStyles.LEFT}
        />
      </View>,
      <View key={4} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs.GT}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NEQ}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.LT}
          borders={BorderStyles.BOTTOM}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.RIGHT_PAREN}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={5} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NUM_7}
          borders={BorderStyles.LEFT}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NUM_4}
          borders={BorderStyles.LEFT}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NUM_1}
          borders={BorderStyles.ALL}
        />
        <ManyKeypadButton keys={extraKeys} borders={BorderStyles.LEFT} />
      </View>,
      <View key={6} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NUM_8}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NUM_5}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NUM_2}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NUM_0}
          borders={BorderStyles.LEFT}
        />
      </View>,
      <View key={7} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NUM_9}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NUM_6}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NUM_3}
          borders={BorderStyles.BOTTOM}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.DECIMAL}
          borders={BorderStyles.LEFT}
        />
      </View>,
      <View key={8} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs.DIVIDE}
          borders={BorderStyles.LEFT}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.TIMES}
          borders={BorderStyles.LEFT}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.MINUS}
          borders={BorderStyles.LEFT}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.PLUS}
          borders={BorderStyles.LEFT}
        />
      </View>,
      <View key={9} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs.FRAC_INCLUSIVE}
          style={roundTopRight && roundedTopRight}
        />
        <TouchableKeypadButton keyConfig={KeyConfigs.CDOT} />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.BACKSPACE}
          borders={BorderStyles.LEFT}
        />
        <TouchableKeypadButton
          keyConfig={this._getDismissOrJumpOutKey()}
          borders={BorderStyles.LEFT}
        />
      </View>,
    ];

    return {
      content: (
        <View key="pag1" style={leftPageStyle}>
          {columns.map((col) => col)}
        </View>
      ),
      title: "Geral",
    };
  };

  _renderSecondPage = () => {
    const { roundTopLeft } = this.props;

    const middlePageStyle = [row, fullWidth, styles.pageBackground];
    const columns = [
      <View key={0} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["α"]}
          borders={BorderStyles.NONE}
          style={roundTopLeft && roundedTopLeft}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["ϴ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Ο"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["τ"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={1} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["β"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["θ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["ο"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["υ"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={2} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Γ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["ι"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Π"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Φ"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={3} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["γ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["k"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["π"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["φ"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={4} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Δ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Λ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Ρ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["χ"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={5} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["δ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["λ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["ρ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Ψ"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={6} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Ε"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["μ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Σ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["ψ"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={7} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["ε"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["ν"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["σ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Ω"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={8} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["ζ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Ξ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Τ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["ω"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={9} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["η"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["ξ"]}
          borders={BorderStyles.BOTTOM}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.BACKSPACE}
          borders={BorderStyles.ALL}
        />
        <TouchableKeypadButton
          keyConfig={this._getDismissOrJumpOutKey()}
          borders={BorderStyles.LEFT}
        />
      </View>,
    ];

    return {
      content: (
        <View key="pag2" style={middlePageStyle}>
          {columns.map((col) => col)}
        </View>
      ),
      title: "Letras gregas",
    };
  };

  _renderThirdPage = () => {
    const middlePageStyle = [
      row,
      fullWidth,
      styles.pageBackground,
      styles.fullHeight,
    ];

    const columns = [
      <View key={0} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["←"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["↑"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={1} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["→"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["↓"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={2} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["↖"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["↗"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={3} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["↘"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["↙"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={4} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs.LSH}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.RSH}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={5} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⇦"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["↔"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.MAPSTO}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={6} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⇨"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["↕"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.LONGMAPSTO}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={7} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⇧"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={8} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⇩"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={9} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⇿"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.NOOP}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.BACKSPACE}
          borders={BorderStyles.ALL}
        />
        <TouchableKeypadButton
          keyConfig={this._getDismissOrJumpOutKey()}
          borders={BorderStyles.LEFT}
        />
      </View>,
    ];

    return {
      content: (
        <View key="pag3" style={middlePageStyle}>
          {columns.map((col) => col)}
        </View>
      ),
      title: "Setas e relações",
    };
  };

  _renderFourthPage = () => {
    const { roundTopLeft, roundTopRight } = this.props;

    const rightPageStyle = [
      row,
      fullWidth,
      styles.pageBackground,
      roundTopRight && roundedTopRight,
    ];

    const columns = [
      <View key={0} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∀"]}
          borders={BorderStyles.NONE}
          style={roundTopLeft && roundedTopLeft}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["Δ"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∞"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∴"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={1} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∁"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∇"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∂"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∵"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={2} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∪"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⋃"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⊃"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⊂"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={3} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∩"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⋂"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⊅"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⊄"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={4} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∈"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∋"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∓"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["±"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={5} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∉"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∌"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∫"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∑"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={6} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∅"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⊕"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⊙"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["⊗"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={7} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∕"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∃"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["≠"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["≡"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={8} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∖"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∘"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∠"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["≅"]}
          borders={BorderStyles.NONE}
        />
      </View>,
      <View key={9} style={[column, oneColumn]}>
        <TouchableKeypadButton
          keyConfig={KeyConfigs["|"]}
          borders={BorderStyles.NONE}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs["∙"]}
          borders={BorderStyles.BOTTOM}
        />
        <TouchableKeypadButton
          keyConfig={KeyConfigs.BACKSPACE}
          borders={BorderStyles.ALL}
        />
        <TouchableKeypadButton
          keyConfig={this._getDismissOrJumpOutKey()}
          borders={BorderStyles.LEFT}
        />
      </View>,
    ];

    return {
      content: (
        <View key="pag4" style={rightPageStyle}>
          {columns.map((col) => col)}
        </View>
      ),
      title: "Símbolos matemáticos",
    };
  };

  render() {
    const { currentPage, onChangePage } = this.props;

    const firstPage = this._renderFirstPage();
    const secondPage = this._renderSecondPage();
    const thirdPage = this._renderThirdPage();
    const fourthPage = this._renderFourthPage();

    return (
      <ManyPagesKeypad
        onChangePage={onChangePage}
        currentPage={currentPage}
        pages={[firstPage, secondPage, thirdPage, fourthPage]}
      />
    );
  }
}

const styles = StyleSheet.create({
  // NOTE(charlie): These backgrounds are applied to as to fill in some
  // unfortunate 'cracks' in the layout. However, not all keys in the first
  // page use this background color (namely, the 'command' keys, backspace and
  // dismiss).
  // TODO(charlie): Apply the proper background between the 'command' keys.
  pageBackground: {
    backgroundColor: valueGrey,
  },
  fullHeight: {
    height: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    currentPage: state.pager.currentPage,
    cursorContext: state.input.cursor.context,
    dynamicJumpOut: !state.layout.navigationPadEnabled,
  };
};

module.exports = connect(mapStateToProps)(ExpressionKeypad);
