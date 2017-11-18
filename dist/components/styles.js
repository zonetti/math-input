'use strict';

/**
 * Common styles shared across components.
 */

var _require = require('aphrodite'),
    StyleSheet = _require.StyleSheet;

var _require2 = require('./common-style'),
    compactKeypadBorderRadiusPx = _require2.compactKeypadBorderRadiusPx;

module.exports = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    oneColumn: {
        flexGrow: 1
    },
    fullWidth: {
        width: '100%'
    },
    stretch: {
        alignItems: 'stretch'
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredText: {
        textAlign: 'center'
    },
    roundedTopLeft: {
        borderTopLeftRadius: compactKeypadBorderRadiusPx
    },
    roundedTopRight: {
        borderTopRightRadius: compactKeypadBorderRadiusPx
    }
});