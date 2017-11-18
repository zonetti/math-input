"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * An arrow icon, used by the other navigational keys.
 */
var React = require('react');

var Arrow = function Arrow(props) {
  return React.createElement(
    "g",
    _extends({ fill: "none", fillRule: "evenodd" }, props),
    React.createElement("path", { fill: "none", d: "M0 0h48v48H0z" }),
    React.createElement("path", { fill: "none", d: "M12 12h24v24H12z" }),
    React.createElement("path", { stroke: "#888D93", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", d: "M22 18l-6 6 6 6M16 24h16" })
  );
};

module.exports = Arrow;