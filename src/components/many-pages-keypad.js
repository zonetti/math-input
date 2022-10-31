const PropTypes = require("prop-types");

const React = require("react");
const { connect } = require("react-redux");
const { StyleSheet } = require("aphrodite");

const Keypad = require("./keypad");
const ViewPager = require("./view-pager");
const PagerIndicator = require("./pager-indicator");
const { View } = require("../fake-react-native-web");
const { column, row, fullWidth } = require("./styles");
const {
  innerBorderColor,
  innerBorderStyle,
  innerBorderWidthPx,
  gray85,
} = require("./common-style");

class ManyPagesKeypad extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    pages: PropTypes.array.isRequired,
    paginationEnabled: PropTypes.bool.isRequired,
    onChangePage: PropTypes.func,
  };

  render() {
    const { currentPage, pages, paginationEnabled, onChangePage } = this.props;

    const pageContents = Array.from(pages, (page) => page.content);
    const pageTitles = Array.from(pages, (page) => page.title);

    return (
      <Keypad style={[column, styles.keypad]}>
        <PagerIndicator
          onChangePage={onChangePage}
          numPages={pages.length}
          currentPage={currentPage}
          titles={pageTitles}
        />
        <View style={styles.borderTop}>
          <ViewPager>{pageContents}</ViewPager>
        </View>
      </Keypad>
    );
  }
}

const styles = StyleSheet.create({
  keypad: {
    // Set the background to light grey, so that when the user drags the
    // keypad pages past the edges, there's a grey backdrop.
    backgroundColor: gray85,
  },

  borderTop: {
    borderTop:
      `${innerBorderWidthPx}px ${innerBorderStyle} ` + `${innerBorderColor}`,
  },
  borderLeft: {
    borderLeft:
      `${innerBorderWidthPx}px ${innerBorderStyle} ` + `${innerBorderColor}`,
    boxSizing: "content-box",
  },
});

const mapStateToProps = (state) => {
  return {
    paginationEnabled: state.layout.paginationEnabled,
  };
};

module.exports = connect(mapStateToProps)(ManyPagesKeypad);
