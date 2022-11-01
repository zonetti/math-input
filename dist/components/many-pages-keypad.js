"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require("prop-types");

var React = require("react");

var _require = require("react-redux"),
    connect = _require.connect;

var _require2 = require("aphrodite"),
    StyleSheet = _require2.StyleSheet;

var Keypad = require("./keypad");
var ViewPager = require("./view-pager");
var PagerIndicator = require("./pager-indicator");

var _require3 = require("../fake-react-native-web"),
    View = _require3.View;

var _require4 = require("./styles"),
    column = _require4.column,
    row = _require4.row,
    fullWidth = _require4.fullWidth;

var _require5 = require("./common-style"),
    innerBorderColor = _require5.innerBorderColor,
    innerBorderStyle = _require5.innerBorderStyle,
    innerBorderWidthPx = _require5.innerBorderWidthPx,
    gray85 = _require5.gray85;

var ManyPagesKeypad = function (_React$Component) {
  _inherits(ManyPagesKeypad, _React$Component);

  function ManyPagesKeypad() {
    _classCallCheck(this, ManyPagesKeypad);

    return _possibleConstructorReturn(this, (ManyPagesKeypad.__proto__ || Object.getPrototypeOf(ManyPagesKeypad)).apply(this, arguments));
  }

  _createClass(ManyPagesKeypad, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          currentPage = _props.currentPage,
          pages = _props.pages,
          paginationEnabled = _props.paginationEnabled,
          onChangePage = _props.onChangePage;


      var pageContents = Array.from(pages, function (page) {
        return page.content;
      });
      var pageTitles = Array.from(pages, function (page) {
        return page.title;
      });

      return React.createElement(
        Keypad,
        { style: [column, styles.keypad] },
        React.createElement(PagerIndicator, {
          onChangePage: onChangePage,
          numPages: pages.length,
          currentPage: currentPage,
          titles: pageTitles
        }),
        React.createElement(
          View,
          { style: styles.borderTop },
          React.createElement(
            ViewPager,
            null,
            pageContents
          )
        )
      );
    }
  }]);

  return ManyPagesKeypad;
}(React.Component);

ManyPagesKeypad.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.array.isRequired,
  paginationEnabled: PropTypes.bool.isRequired,
  onChangePage: PropTypes.func
};


var styles = StyleSheet.create({
  keypad: {
    // Set the background to light grey, so that when the user drags the
    // keypad pages past the edges, there's a grey backdrop.
    backgroundColor: gray85
  },

  borderTop: {
    borderTop: innerBorderWidthPx + "px " + innerBorderStyle + " " + ("" + innerBorderColor)
  },
  borderLeft: {
    borderLeft: innerBorderWidthPx + "px " + innerBorderStyle + " " + ("" + innerBorderColor),
    boxSizing: "content-box"
  }
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    paginationEnabled: state.layout.paginationEnabled
  };
};

module.exports = connect(mapStateToProps)(ManyPagesKeypad);