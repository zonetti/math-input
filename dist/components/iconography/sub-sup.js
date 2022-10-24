"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var SubSup = function (_React$Component) {
  _inherits(SubSup, _React$Component);

  function SubSup() {
    _classCallCheck(this, SubSup);

    return _possibleConstructorReturn(this, (SubSup.__proto__ || Object.getPrototypeOf(SubSup)).apply(this, arguments));
  }

  _createClass(SubSup, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "svg",
        {
          width: "22",
          height: "24",
          viewBox: "0 0 22 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        },
        React.createElement(
          "g",
          { "clip-path": "url(#clip0_337_606)" },
          React.createElement("rect", { width: "22", height: "24", fill: "white" }),
          React.createElement("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M0 6C0 4.89543 0.89543 4 2 4H10C11.1046 4 12 4.89543 12 6V18C12 19.1046 11.1046 20 10 20H2C0.895431 20 0 19.1046 0 18V6ZM10 6L2 6V18H10V6Z",
            fill: "#3C3E40"
          }),
          React.createElement("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M14 2C14 0.895431 14.8954 0 16 0H20C21.1046 0 22 0.89543 22 2V6C22 7.10457 21.1046 8 20 8H16C14.8954 8 14 7.10457 14 6V2ZM20 2H16V6H20V2Z",
            fill: "#3C3E40"
          }),
          React.createElement("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M14 18C14 16.8954 14.8954 16 16 16H20C21.1046 16 22 16.8954 22 18V22C22 23.1046 21.1046 24 20 24H16C14.8954 24 14 23.1046 14 22V18ZM20 18H16V22H20V18Z",
            fill: "#3C3E40"
          })
        ),
        React.createElement(
          "defs",
          null,
          React.createElement(
            "clipPath",
            { id: "clip0_337_606" },
            React.createElement("rect", { width: "22", height: "24", fill: "white" })
          )
        )
      );
    }
  }]);

  return SubSup;
}(React.Component);

module.exports = SubSup;