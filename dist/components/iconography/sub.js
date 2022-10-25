"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require("prop-types");
var React = require("react");

var Sub = function (_React$Component) {
  _inherits(Sub, _React$Component);

  function Sub() {
    _classCallCheck(this, Sub);

    return _possibleConstructorReturn(this, (Sub.__proto__ || Object.getPrototypeOf(Sub)).apply(this, arguments));
  }

  _createClass(Sub, [{
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
          { "clip-path": "url(#clip0_337_578)" },
          React.createElement("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M0 1.25C0 0.559643 0.559645 0 1.25 0H10.75C11.4404 0 12 0.559645 12 1.25V14.75C12 15.4404 11.4404 16 10.75 16H1.25C0.559643 16 0 15.4404 0 14.75V1.25ZM2 2V14H10V2H2Z",
            fill: this.props.color
          }),
          React.createElement("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M14 13.25C14 12.5596 14.5596 12 15.25 12H20.75C21.4404 12 22 12.5596 22 13.25V18.75C22 19.4404 21.4404 20 20.75 20H15.25C14.5596 20 14 19.4404 14 18.75V13.25ZM16 14V18H20V14H16Z",
            fill: this.props.color
          })
        ),
        React.createElement(
          "defs",
          null,
          React.createElement(
            "clipPath",
            { id: "clip0_337_578" },
            React.createElement("rect", { width: "22", height: "20", fill: "white" })
          )
        )
      );
    }
  }]);

  return Sub;
}(React.Component);

Sub.propTypes = {
  color: PropTypes.string.isRequired
};


module.exports = Sub;