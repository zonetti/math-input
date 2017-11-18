'use strict';

/**
 * A component that renders the RIGHT iconograpy in SVG.
 */
var React = require('react');

var Arrow = require('./arrow');

var Right = function Right() {
    return React.createElement(
        'svg',
        { width: '48', height: '48', viewBox: '0 0 48 48' },
        React.createElement(Arrow, { transform: 'rotate(180 24 24)' })
    );
};

module.exports = Right;