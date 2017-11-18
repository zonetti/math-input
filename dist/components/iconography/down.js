'use strict';

/**
 * A component that renders the DOWN iconograpy in SVG.
 */
var React = require('react');

var Arrow = require('./arrow');

var Down = function Down() {
    return React.createElement(
        'svg',
        { width: '48', height: '48', viewBox: '0 0 48 48' },
        React.createElement(Arrow, { transform: 'rotate(270 24 24)' })
    );
};

module.exports = Down;