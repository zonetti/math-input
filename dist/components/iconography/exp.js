"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require("prop-types");
var React = require("react");

var Exp = function (_React$Component) {
  _inherits(Exp, _React$Component);

  function Exp() {
    _classCallCheck(this, Exp);

    return _possibleConstructorReturn(this, (Exp.__proto__ || Object.getPrototypeOf(Exp)).apply(this, arguments));
  }

  _createClass(Exp, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "svg",
        {
          width: "22",
          height: "20",
          viewBox: "0 0 22 20",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        },
        React.createElement(
          "g",
          { clipPath: "url(#clip0_337_389)" },
          React.createElement("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M0 5.25C0 4.55964 0.559645 4 1.25 4H10.75C11.4404 4 12 4.55965 12 5.25V18.75C12 19.4404 11.4404 20 10.75 20H1.25C0.559643 20 0 19.4404 0 18.75V5.25ZM2 6V18H10V6H2Z",
            fill: this.props.color
          }),
          React.createElement("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M14 1.25C14 0.559645 14.5596 0 15.25 0H20.75C21.4404 0 22 0.559644 22 1.25V6.75C22 7.44036 21.4404 8 20.75 8H15.25C14.5596 8 14 7.44036 14 6.75V1.25ZM16 2V6H20V2H16Z",
            fill: this.props.color
          })
        ),
        React.createElement(
          "defs",
          null,
          React.createElement(
            "clipPath",
            { id: "clip0_337_389" },
            React.createElement("rect", { width: "22", height: "20", fill: "white" })
          )
        )
      );
    }
  }]);

  return Exp;
}(React.Component);

Exp.propTypes = {
  color: PropTypes.string.isRequired
};


module.exports = Exp;