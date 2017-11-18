'use strict';

/**
 * React PropTypes that may be shared between components.
 */

var React = require('react');

var KeyConfigs = require('../data/key-configs');
var CursorContexts = require('./input/cursor-contexts');

var _require = require('../consts'),
    BorderDirections = _require.BorderDirections,
    EchoAnimationTypes = _require.EchoAnimationTypes,
    IconTypes = _require.IconTypes,
    KeyTypes = _require.KeyTypes,
    KeypadTypes = _require.KeypadTypes;

var iconPropType = React.PropTypes.shape({
    type: React.PropTypes.oneOf(Object.keys(IconTypes)).isRequired,
    data: React.PropTypes.string.isRequired
});

var keyIdPropType = React.PropTypes.oneOf(Object.keys(KeyConfigs));

var keyConfigPropType = React.PropTypes.shape({
    ariaLabel: React.PropTypes.string,
    id: keyIdPropType.isRequired,
    type: React.PropTypes.oneOf(Object.keys(KeyTypes)).isRequired,
    childKeyIds: React.PropTypes.arrayOf(keyIdPropType),
    icon: iconPropType.isRequired
});

var keypadConfigurationPropType = React.PropTypes.shape({
    keypadType: React.PropTypes.oneOf(Object.keys(KeypadTypes)).isRequired,
    extraKeys: React.PropTypes.arrayOf(keyIdPropType)
});

// NOTE(charlie): This is a React element.
var keypadElementPropType = React.PropTypes.shape({
    activate: React.PropTypes.func.isRequired,
    dismiss: React.PropTypes.func.isRequired,
    configure: React.PropTypes.func.isRequired,
    setCursor: React.PropTypes.func.isRequired,
    setKeyHandler: React.PropTypes.func.isRequired
});

var bordersPropType = React.PropTypes.arrayOf(React.PropTypes.oneOf(Object.keys(BorderDirections)));

var boundingBoxPropType = React.PropTypes.shape({
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    top: React.PropTypes.number,
    right: React.PropTypes.number,
    bottom: React.PropTypes.number,
    left: React.PropTypes.number
});

var echoPropType = React.PropTypes.shape({
    animationId: React.PropTypes.string.isRequired,
    animationType: React.PropTypes.oneOf(Object.keys(EchoAnimationTypes)).isRequired,
    borders: bordersPropType,
    id: keyIdPropType.isRequired,
    initialBounds: boundingBoxPropType.isRequired
});

var cursorContextPropType = React.PropTypes.oneOf(Object.keys(CursorContexts));

var popoverPropType = React.PropTypes.shape({
    parentId: keyIdPropType.isRequired,
    bounds: boundingBoxPropType.isRequired,
    childKeyIds: React.PropTypes.arrayOf(keyIdPropType).isRequired
});

var childrenPropType = React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.node), React.PropTypes.node]);

module.exports = {
    keyConfigPropType: keyConfigPropType,
    keyIdPropType: keyIdPropType,
    keypadConfigurationPropType: keypadConfigurationPropType,
    keypadElementPropType: keypadElementPropType,
    bordersPropType: bordersPropType,
    boundingBoxPropType: boundingBoxPropType,
    echoPropType: echoPropType,
    cursorContextPropType: cursorContextPropType,
    popoverPropType: popoverPropType,
    iconPropType: iconPropType,
    childrenPropType: childrenPropType
};