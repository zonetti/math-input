'use strict';

/**
 * A component that renders the UP iconograpy in SVG.
 */
var React = require('react');

var Arrow = require('./arrow');

var Up = function Up() {
    return React.createElement(
        'svg',
        { width: '48', height: '48', viewBox: '0 0 48 48' },
        React.createElement(Arrow, { transform: 'rotate(90 24 24)' })
    );
};

module.exports = Up;