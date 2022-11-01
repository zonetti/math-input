"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require("prop-types");
/**
 * A view pager that allows for pagination in the horizontal direction.
 * Right now, there are a number of limitations built into the system. Namely:
 *  - It only supports pagination in the horizontal direction.
 *  - It supports exactly two pages.
 */

var React = require("react");

var _require = require("react-redux"),
    connect = _require.connect;

var _require2 = require("aphrodite"),
    StyleSheet = _require2.StyleSheet;

var _require3 = require("../fake-react-native-web"),
    View = _require3.View;

var _require4 = require("./styles"),
    row = _require4.row;

var _require5 = require("./prop-types"),
    childrenPropType = _require5.childrenPropType;

var _require6 = require("./common-style"),
    innerBorderColor = _require6.innerBorderColor,
    innerBorderStyle = _require6.innerBorderStyle,
    innerBorderWidthPx = _require6.innerBorderWidthPx;

var ViewPager = function (_React$Component) {
  _inherits(ViewPager, _React$Component);

  function ViewPager() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ViewPager);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ViewPager.__proto__ || Object.getPrototypeOf(ViewPager)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      animationDurationMs: 0
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ViewPager, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      // Compute the appropriate animation length, if the pager should
      // animate to its next position.
      var animationDurationMs = void 0;
      if (newProps.animateToPosition) {
        var finalTranslateX = newProps.translateX;
        var prevTranslateX = this.props.translateX;

        // We animate at a rate of 1 pixel per millisecond, and thus we can
        // use the displacement as the animation duration.
        animationDurationMs = Math.abs(finalTranslateX - prevTranslateX);
      } else {
        animationDurationMs = 0;
      }
      this.setState({
        animationDurationMs: 100
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          pageWidthPx = _props.pageWidthPx,
          translateX = _props.translateX;
      var animationDurationMs = this.state.animationDurationMs;

      // Note: By default, <View> sets a `maxWidth` of 100% to fix some
      // Flexbox bugs. We have to override it to accommodate for our two
      // pages. The exact value here isn't super important, as long as it's
      // large enough to accommodate for all pages (so, number of pages * 100%) and some
      // separators.

      var pageWidth = StyleSheet.create({
        mw: {
          maxWidth: (children.length * 100).toString() + "%"
        }
      });

      var pagerStyle = [row, styles.manyPagePager, pageWidth.mw];

      var transform = {
        msTransform: "translate3d(" + translateX + "px, 0, 0)",
        WebkitTransform: "translate3d(" + translateX + "px, 0, 0)",
        transform: "translate3d(" + translateX + "px, 0, 0)"
      };
      var animate = animationDurationMs ? {
        msTransitionProperty: "transform",
        WebkitTransitionProperty: "transform",
        transitionProperty: "transform",
        msTransitionDuration: animationDurationMs + "ms",
        WebkitTransitionDuration: animationDurationMs + "ms",
        transitionDuration: animationDurationMs + "ms",
        msTransitionTimingFunction: "ease-out",
        WebkitTransitionTimingFunction: "ease-out",
        transitionTimingFunction: "ease-out"
      } : {};
      var dynamicPagerStyle = _extends({}, transform, animate);

      var dynamicPageStyle = {
        width: pageWidthPx
      };

      return React.createElement(
        View,
        { style: pagerStyle, dynamicStyle: dynamicPagerStyle },
        children.map(function (pageView, index) {
          if (index < children.length - 1) {
            return React.createElement(
              View,
              { key: index, dynamicStyle: dynamicPageStyle },
              pageView
            );
          } else {
            return React.createElement(
              View,
              {
                key: index,
                style: styles.rightPage,
                dynamicStyle: dynamicPageStyle
              },
              pageView
            );
          }
        })
      );
    }
  }]);

  return ViewPager;
}(React.Component);

ViewPager.propTypes = {
  // Whether the page should animate to its next specified position.
  animateToPosition: PropTypes.bool,
  children: childrenPropType,
  pageWidthPx: PropTypes.number.isRequired,
  translateX: PropTypes.number.isRequired
};


var styles = StyleSheet.create({
  manyPagePager: {
    alignSelf: "flex-start"
  },

  rightPage: {
    borderLeft: innerBorderWidthPx + "px " + innerBorderStyle + " " + ("" + innerBorderColor),
    boxSizing: "content-box"
  }
});

var mapStateToProps = function mapStateToProps(state) {
  var _state$pager = state.pager,
      animateToPosition = _state$pager.animateToPosition,
      currentPage = _state$pager.currentPage,
      dx = _state$pager.dx,
      pageWidthPx = _state$pager.pageWidthPx;

  return {
    animateToPosition: animateToPosition,
    pageWidthPx: pageWidthPx,
    translateX: -currentPage * (pageWidthPx + innerBorderWidthPx) + dx
  };
};

module.exports = connect(mapStateToProps)(ViewPager);