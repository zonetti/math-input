'use strict';

/**
 * An component that renders the LEFT iconograpy in SVG.
 */
var React = require('react');

var Arrow = require('./arrow');

var Left = function Left() {
  return React.createElement(
    'svg',
    { width: '48', height: '48', viewBox: '0 0 48 48' },
    React.createElement(Arrow, null)
  );
};

module.exports = Left;