const PropTypes = require("prop-types");
/**
 * A component that renders a view pager indicator, with a circular icon for
 * each page.
 */

const React = require("react");
const { StyleSheet } = require("aphrodite");

const { View } = require("../fake-react-native-web");
const { pageIndicatorHeightPx } = require("./common-style");

class PagerIcon extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    active: PropTypes.bool,
    onChangePage: PropTypes.func,
  };

  render() {
    const { text, active, onChangePage } = this.props;
    const pStyle = {
      cursor: active ? "default" : "pointer",
      color: active ? "#0B43BF" : "#626975",
      margin: "0 20px",
      fontFamily: "Lato",
      fontSize: "16px",
      fontWeight: "700",
    };
    return (
      <p style={pStyle} onClick={onChangePage}>
        {text}
      </p>
    );
  }
}

class PagerIndicator extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
    onChangePage: PropTypes.func,
    titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const { currentPage, numPages, onChangePage, titles } = this.props;
    // Collect the various indicator circles.
    const indicators = [];
    const activePageIndex = Array.from({ length: numPages }, (x, i) => i).find(
      (i) => i === currentPage
    );
    for (let i = 0; i < numPages; i++) {
      indicators.push(
        <PagerIcon
          key={i}
          text={titles[i]}
          active={i === currentPage}
          onChangePage={() => {
            if (i < activePageIndex) {
              for (let j = 0; j < activePageIndex - i; j++) {
                onChangePage("previous");
              }
            } else if (i > activePageIndex) {
              for (let j = 0; j < i - activePageIndex; j++) {
                onChangePage("next");
              }
            }
          }}
        />
      );
    }

    return (
      <View style={styles.indicatorStrip}>
        <View style={styles.iconStrip}>{indicators}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  indicatorStrip: {
    backgroundColor: "#F0F1F2",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: pageIndicatorHeightPx,
  },
  iconStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

module.exports = PagerIndicator;
