'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _keypadForType;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Redux = require('redux');

var _require = require('../components/common-style'),
    tabletCutoffPx = _require.tabletCutoffPx;

var computeLayoutParameters = require('../components/compute-layout-parameters');

var _require2 = require('../consts'),
    DeviceOrientations = _require2.DeviceOrientations,
    DeviceTypes = _require2.DeviceTypes,
    EchoAnimationTypes = _require2.EchoAnimationTypes,
    KeyTypes = _require2.KeyTypes,
    KeypadTypes = _require2.KeypadTypes,
    LayoutModes = _require2.LayoutModes;

var Keys = require('../data/keys');
var KeyConfigs = require('../data/key-configs');
var CursorContexts = require('../components/input/cursor-contexts');
var GestureManager = require('../components/gesture-manager');
var VelocityTracker = require('../components/velocity-tracker');

var FractionKeypad = require('../components/fraction-keypad');
var ExpressionKeypad = require('../components/expression-keypad');

var keypadForType = (_keypadForType = {}, _defineProperty(_keypadForType, KeypadTypes.FRACTION, FractionKeypad), _defineProperty(_keypadForType, KeypadTypes.EXPRESSION, ExpressionKeypad), _keypadForType);

var createStore = function createStore() {
    var initialInputState = {
        keyHandler: null,
        cursor: {
            context: CursorContexts.NONE
        }
    };

    var inputReducer = function inputReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialInputState;
        var action = arguments[1];

        switch (action.type) {
            case 'SetKeyHandler':
                return _extends({}, state, {
                    keyHandler: action.keyHandler
                });

            case 'PressKey':
                var keyConfig = KeyConfigs[action.key];
                if (keyConfig.type !== KeyTypes.KEYPAD_NAVIGATION) {
                    // This is probably an anti-pattern but it works for the
                    // case where we don't actually control the state but we
                    // still want to communicate with the other object
                    return _extends({}, state, {
                        cursor: state.keyHandler(keyConfig.id)
                    });
                }

                // TODO(kevinb) get state from MathQuill and store it?
                return state;

            case 'SetCursor':
                return _extends({}, state, {
                    cursor: action.cursor
                });

            default:
                return state;
        }
    };

    var defaultKeypadType = KeypadTypes.EXPRESSION;

    var initialKeypadState = {
        extraKeys: ['x', 'y', Keys.THETA, Keys.PI],
        keypadType: defaultKeypadType,
        active: false
    };

    var keypadReducer = function keypadReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialKeypadState;
        var action = arguments[1];

        switch (action.type) {
            case 'DismissKeypad':
                return _extends({}, state, {
                    active: false
                });

            case 'ActivateKeypad':
                return _extends({}, state, {
                    active: true
                });

            case 'ConfigureKeypad':
                return _extends({}, state, {
                    // Default `extraKeys` to the empty array.
                    extraKeys: []
                }, action.configuration);

            case 'PressKey':
                var keyConfig = KeyConfigs[action.key];
                // NOTE(charlie): Our keypad system operates by triggering key
                // presses with key IDs in a dumb manner, such that the keys
                // don't know what they can do--instead, the store is
                // responsible for interpreting key presses and triggering the
                // right actions when they occur. Hence, we figure off a
                // dismissal here rather than dispatching a dismiss action in
                // the first place.
                if (keyConfig.id === Keys.DISMISS) {
                    return keypadReducer(state, { type: 'DismissKeypad' });
                }
                return state;

            default:
                return state;
        }
    };

    // We default to the right-most page. This is done so-as to enforce a
    // consistent orientation between the view pager layout and the flattened
    // layout, where our default page appears on the far right.
    var getDefaultPage = function getDefaultPage(numPages) {
        return numPages - 1;
    };

    var initialPagerState = {
        animateToPosition: false,
        currentPage: getDefaultPage(keypadForType[defaultKeypadType].numPages),
        // The cumulative differential in the horizontal direction for the
        // current swipe.
        dx: 0,
        numPages: keypadForType[defaultKeypadType].numPages,
        pageWidthPx: 0,
        velocityTracker: new VelocityTracker()
    };

    var pagerReducer = function pagerReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialPagerState;
        var action = arguments[1];

        switch (action.type) {
            case 'ConfigureKeypad':
                var keypadType = action.configuration.keypadType;
                var numPages = keypadForType[keypadType].numPages;

                return _extends({}, state, {
                    numPages: numPages,
                    animateToPosition: false,
                    currentPage: getDefaultPage(numPages),
                    dx: 0
                });

            case 'SetPageSize':
                return _extends({}, state, {
                    pageWidthPx: action.pageWidthPx
                });

            case 'PressKey':
                var keyConfig = KeyConfigs[action.key];

                // Reset the keypad page if the user performs a math operation.
                if (keyConfig.type === KeyTypes.VALUE || keyConfig.type === KeyTypes.OPERATOR) {
                    return pagerReducer(state, { type: 'ResetKeypadPage' });
                }
                return state;

            case 'ResetKeypadPage':
                return _extends({}, state, {
                    animateToPosition: true,
                    // We start at the right-most page.
                    currentPage: getDefaultPage(state.numPages),
                    dx: 0
                });

            case 'PageKeypadRight':
                var nextPage = Math.min(state.currentPage + 1, state.numPages - 1);
                return _extends({}, state, {
                    animateToPosition: true,
                    currentPage: nextPage,
                    dx: 0
                });

            case 'PageKeypadLeft':
                var prevPage = Math.max(state.currentPage - 1, 0);
                return _extends({}, state, {
                    animateToPosition: true,
                    currentPage: prevPage,
                    dx: 0
                });

            case 'OnSwipeChange':
                state.velocityTracker.push(action.dx);

                return _extends({}, state, {
                    animateToPosition: false,
                    dx: action.dx
                });

            case 'OnSwipeEnd':
                var pageWidthPx = state.pageWidthPx,
                    velocityTracker = state.velocityTracker;
                var dx = action.dx;

                var velocity = velocityTracker.getVelocity();

                // NOTE(charlie): These will need refinement. The velocity comes
                // from Framer.
                var minFlingVelocity = 0.1;
                var minFlingDistance = 10;

                var shouldPageRight = dx < -pageWidthPx / 2 || velocity < -minFlingVelocity && dx < -minFlingDistance;

                var shouldPageLeft = dx > pageWidthPx / 2 || velocity > minFlingVelocity && dx > minFlingDistance;

                if (shouldPageRight) {
                    return pagerReducer(state, { type: 'PageKeypadRight' });
                } else if (shouldPageLeft) {
                    return pagerReducer(state, { type: 'PageKeypadLeft' });
                }

                return _extends({}, state, {
                    animateToPosition: true,
                    dx: 0
                });

            default:
                return state;
        }
    };

    var createGestureManager = function createGestureManager(swipeEnabled) {
        return new GestureManager({
            swipeEnabled: swipeEnabled
        }, {
            onSwipeChange: function onSwipeChange(dx) {
                store.dispatch({
                    type: 'OnSwipeChange',
                    dx: dx
                });
            },
            onSwipeEnd: function onSwipeEnd(dx) {
                store.dispatch({
                    type: 'OnSwipeEnd',
                    dx: dx
                });
            },
            onActiveNodesChanged: function onActiveNodesChanged(activeNodes) {
                store.dispatch({
                    type: 'SetActiveNodes',
                    activeNodes: activeNodes
                });
            },
            onClick: function onClick(key, layoutProps, inPopover) {
                store.dispatch(_extends({
                    type: 'PressKey',
                    key: key
                }, layoutProps, {
                    inPopover: inPopover
                }));
            }
        }, [], [Keys.BACKSPACE, Keys.UP, Keys.RIGHT, Keys.DOWN, Keys.LEFT]);
    };

    var initialGestureState = {
        popover: null,
        focus: null,
        gestureManager: createGestureManager(keypadForType[defaultKeypadType].numPages > 1)
    };

    var gestureReducer = function gestureReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialGestureState;
        var action = arguments[1];

        switch (action.type) {
            case 'DismissKeypad':
                // NOTE(charlie): In the past, we enforced the "gesture manager
                // will not receive any events when the keypad is hidden"
                // assumption by assuming that the keypad would be hidden when
                // dismissed and, as such, that none of its managed DOM nodes
                // would be able to receive touch events. However, on mobile
                // Safari, we're seeing that some of the keys receive touch
                // events even when off-screen, inexplicably. So, to guard
                // against that bug and make the contract explicit, we enable
                // and disable event tracking on activation and dismissal.
                state.gestureManager.disableEventTracking();
                return state;

            case 'ActivateKeypad':
                state.gestureManager.enableEventTracking();
                return state;

            case 'SetActiveNodes':
                return _extends({}, state, action.activeNodes);

            case 'ConfigureKeypad':
                var keypadType = action.configuration.keypadType;
                var numPages = keypadForType[keypadType].numPages;

                var swipeEnabled = numPages > 1;
                return {
                    popover: null,
                    focus: null,
                    gestureManager: createGestureManager(swipeEnabled)
                };

            default:
                return state;
        }
    };

    // Used to generate unique animation IDs for the echo animations. The actual
    // values are irrelevant as long as they are unique.
    var _lastAnimationId = 0;

    var initialEchoState = {
        echoes: []
    };

    var echoReducer = function echoReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialEchoState;
        var action = arguments[1];

        switch (action.type) {
            case 'PressKey':
                var keyConfig = KeyConfigs[action.key];

                // Add in the echo animation if the user performs a math
                // operation.
                if (keyConfig.type === KeyTypes.VALUE || keyConfig.type === KeyTypes.OPERATOR) {
                    return _extends({}, state, {
                        echoes: [].concat(_toConsumableArray(state.echoes), [{
                            animationId: "" + _lastAnimationId++,
                            animationType: action.inPopover ? EchoAnimationTypes.LONG_FADE_ONLY : EchoAnimationTypes.FADE_ONLY,
                            borders: action.borders,
                            id: keyConfig.id,
                            initialBounds: action.initialBounds
                        }])
                    });
                }
                return state;

            case 'RemoveEcho':
                var remainingEchoes = state.echoes.filter(function (echo) {
                    return echo.animationId !== action.animationId;
                });
                return _extends({}, state, {
                    echoes: remainingEchoes
                });

            default:
                return state;
        }
    };

    var initialLayoutState = {
        gridDimensions: {
            numRows: keypadForType[defaultKeypadType].rows,
            numColumns: keypadForType[defaultKeypadType].columns,
            numMaxVisibleRows: keypadForType[defaultKeypadType].maxVisibleRows,
            numPages: keypadForType[defaultKeypadType].numPages
        },
        buttonDimensions: {
            widthPx: 48,
            heightPx: 48
        },
        pageDimensions: {
            pageWidthPx: 0,
            pageHeightPx: 0
        },
        layoutMode: LayoutModes.FULLSCREEN,
        paginationEnabled: false,
        navigationPadEnabled: false
    };

    /**
     * Compute the additional layout state based on the provided page and grid
     * dimensions.
     */
    var layoutParametersForDimensions = function layoutParametersForDimensions(pageDimensions, gridDimensions) {
        var pageWidthPx = pageDimensions.pageWidthPx,
            pageHeightPx = pageDimensions.pageHeightPx;

        // Determine the device type and orientation.

        var deviceOrientation = pageWidthPx > pageHeightPx ? DeviceOrientations.LANDSCAPE : DeviceOrientations.PORTRAIT;
        var deviceType = Math.min(pageWidthPx, pageHeightPx) > tabletCutoffPx ? DeviceTypes.TABLET : DeviceTypes.PHONE;

        // Using that information, make some decisions (or assumptions)
        // about the resulting layout.
        var navigationPadEnabled = deviceType === DeviceTypes.TABLET;
        var paginationEnabled = deviceType === DeviceTypes.PHONE && deviceOrientation === DeviceOrientations.PORTRAIT;

        var deviceInfo = { deviceOrientation: deviceOrientation, deviceType: deviceType };
        var layoutOptions = {
            navigationPadEnabled: navigationPadEnabled,
            paginationEnabled: paginationEnabled,
            // HACK(charlie): It's not great that we're making assumptions about
            // the toolbar (which is rendered by webapp, and should always be
            // visible and anchored to the bottom of the page for phone and
            // tablet exercises). But this is primarily a heuristic (the goal is
            // to preserve a 'good' amount of space between the top of the
            // keypad and the top of the page) so we afford to have some margin
            // of error.
            toolbarEnabled: true
        };

        return _extends({}, computeLayoutParameters(gridDimensions, pageDimensions, deviceInfo, layoutOptions), {
            // Pass along some of the layout information, so that other
            // components in the heirarchy can adapt appropriately.
            navigationPadEnabled: navigationPadEnabled,
            paginationEnabled: paginationEnabled
        });
    };

    var layoutReducer = function layoutReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialLayoutState;
        var action = arguments[1];

        switch (action.type) {
            case 'ConfigureKeypad':
                var keypadType = action.configuration.keypadType;

                var gridDimensions = {
                    numRows: keypadForType[keypadType].rows,
                    numColumns: keypadForType[keypadType].columns,
                    numMaxVisibleRows: keypadForType[keypadType].maxVisibleRows,
                    numPages: keypadForType[keypadType].numPages
                };

                return _extends({}, state, layoutParametersForDimensions(state.pageDimensions, gridDimensions), {
                    gridDimensions: gridDimensions
                });

            case 'SetPageSize':
                var pageWidthPx = action.pageWidthPx,
                    pageHeightPx = action.pageHeightPx;

                var pageDimensions = { pageWidthPx: pageWidthPx, pageHeightPx: pageHeightPx };

                return _extends({}, state, layoutParametersForDimensions(pageDimensions, state.gridDimensions), {
                    pageDimensions: pageDimensions
                });

            default:
                return state;
        }
    };

    var reducer = Redux.combineReducers({
        input: inputReducer,
        keypad: keypadReducer,
        pager: pagerReducer,
        gestures: gestureReducer,
        echoes: echoReducer,
        layout: layoutReducer
    });

    // TODO(charlie): This non-inlined return is necessary so as to allow the
    // gesture manager to dispatch actions on the store in its callbacks. We
    // should come up with a better pattern to remove the two-way dependency.
    var store = Redux.createStore(reducer);

    return store;
};

module.exports = createStore;