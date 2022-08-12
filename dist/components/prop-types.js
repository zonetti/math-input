'use strict';

var PropTypes = require('prop-types');
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

var iconPropType = PropTypes.shape({
    type: PropTypes.oneOf(Object.keys(IconTypes)).isRequired,
    data: PropTypes.string.isRequired
});

var keyIdPropType = PropTypes.oneOf(Object.keys(KeyConfigs));

var keyConfigPropType = PropTypes.shape({
    ariaLabel: PropTypes.string,
    id: keyIdPropType.isRequired,
    type: PropTypes.oneOf(Object.keys(KeyTypes)).isRequired,
    childKeyIds: PropTypes.arrayOf(keyIdPropType),
    icon: iconPropType.isRequired
});

var keypadConfigurationPropType = PropTypes.shape({
    keypadType: PropTypes.oneOf(Object.keys(KeypadTypes)).isRequired,
    extraKeys: PropTypes.arrayOf(keyIdPropType)
});

// NOTE(charlie): This is a React element.
var keypadElementPropType = PropTypes.shape({
    activate: PropTypes.func.isRequired,
    dismiss: PropTypes.func.isRequired,
    configure: PropTypes.func.isRequired,
    setCursor: PropTypes.func.isRequired,
    setKeyHandler: PropTypes.func.isRequired
});

var bordersPropType = PropTypes.arrayOf(PropTypes.oneOf(Object.keys(BorderDirections)));

var boundingBoxPropType = PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
});

var echoPropType = PropTypes.shape({
    animationId: PropTypes.string.isRequired,
    animationType: PropTypes.oneOf(Object.keys(EchoAnimationTypes)).isRequired,
    borders: bordersPropType,
    id: keyIdPropType.isRequired,
    initialBounds: boundingBoxPropType.isRequired
});

var cursorContextPropType = PropTypes.oneOf(Object.keys(CursorContexts));

var popoverPropType = PropTypes.shape({
    parentId: keyIdPropType.isRequired,
    bounds: boundingBoxPropType.isRequired,
    childKeyIds: PropTypes.arrayOf(keyIdPropType).isRequired
});

var childrenPropType = PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]);

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