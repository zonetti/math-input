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
            d: "M0 5.25C0 4.55964 0.559645 4 1.25 4H10.75C11.4404 4 12 4.55965 12 5.25V18.75C12 19.4404 11.4404 20 10.75 20H1.25C0.559643 20 0 19.4404 0 18.75V5.25ZM2 6V18H10V6H2Z",
            fill: "#3C3E40"
          }),
          React.createElement("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M14 1.25C14 0.559645 14.5596 0 15.25 0H20.75C21.4404 0 22 0.559644 22 1.25V6.75C22 7.44036 21.4404 8 20.75 8H15.25C14.5596 8 14 7.44036 14 6.75V1.25ZM16 2V6H20V2H16Z",
            fill: "#3C3E40"
          }),
          React.createElement("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M14 17.25C14 16.5596 14.5596 16 15.25 16H20.75C21.4404 16 22 16.5596 22 17.25V22.75C22 23.4404 21.4404 24 20.75 24H15.25C14.5596 24 14 23.4404 14 22.75V17.25ZM16 18V22H20V18H16Z",
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