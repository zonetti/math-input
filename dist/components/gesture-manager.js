'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A high-level manager for our gesture system. In particular, this class
 * connects our various bits of logic for managing gestures and interactions,
 * and links them together.
 */

var NodeManager = require('./node-manager');
var PopoverStateMachine = require('./popover-state-machine');
var GestureStateMachine = require('./gesture-state-machine');

var coordsForEvent = function coordsForEvent(evt) {
    return [evt.changedTouches[0].clientX, evt.changedTouches[0].clientY];
};

var GestureManager = function () {
    function GestureManager(options, handlers, disabledSwipeKeys, multiPressableKeys) {
        var _this = this;

        _classCallCheck(this, GestureManager);

        var swipeEnabled = options.swipeEnabled;


        this.swipeEnabled = swipeEnabled;

        // Events aren't tracked until event tracking is enabled.
        this.trackEvents = false;

        this.nodeManager = new NodeManager();
        this.popoverStateMachine = new PopoverStateMachine({
            onActiveNodesChanged: function onActiveNodesChanged(activeNodes) {
                var popover = activeNodes.popover,
                    rest = _objectWithoutProperties(activeNodes, ['popover']);

                handlers.onActiveNodesChanged(_extends({
                    popover: popover && {
                        parentId: popover.parentId,
                        bounds: _this.nodeManager.layoutPropsForId(popover.parentId).initialBounds,
                        childKeyIds: popover.childIds
                    }
                }, rest));
            },
            /**
             * `onClick` takes two arguments:
             *
             * @param {string} keyId - the identifier key that should initiate
             *                         a click
             * @param {string} domNodeId - the identifier of the DOM node on
             *                             which the click should be considered
             *                             to have occurred
             * @param {bool} inPopover - whether the key was contained within a
             *                           popover
             *
             * These two parameters will often be equivalent. They will differ,
             * though, when a popover button is itself clicked, in which case
             * we need to mimic the effects of clicking on its 'primary' child
             * key, but animate the click on the popover button.
             */
            onClick: function onClick(keyId, domNodeId, inPopover) {
                handlers.onClick(keyId, _this.nodeManager.layoutPropsForId(domNodeId), inPopover);
            }
        });
        this.gestureStateMachine = new GestureStateMachine({
            onFocus: function onFocus(id) {
                _this.popoverStateMachine.onFocus(id);
            },
            onLongPress: function onLongPress(id) {
                _this.popoverStateMachine.onLongPress(id);
            },
            onTouchEnd: function onTouchEnd(id) {
                _this.popoverStateMachine.onTouchEnd(id);
            },
            onBlur: function onBlur() {
                _this.popoverStateMachine.onBlur();
            },
            onSwipeChange: handlers.onSwipeChange,
            onSwipeEnd: handlers.onSwipeEnd,
            onTrigger: function onTrigger(id) {
                _this.popoverStateMachine.onTrigger(id);
            }
        }, {}, disabledSwipeKeys, multiPressableKeys);
    }

    /**
     * Handle a touch-start event that originated in a node registered with the
     * gesture system.
     *
     * @param {TouchEvent} evt - the raw touch event from the browser
     * @param {string} id - the identifier of the DOM node in which the touch
     *                      occurred
     */


    _createClass(GestureManager, [{
        key: 'onTouchStart',
        value: function onTouchStart(evt, id) {
            if (!this.trackEvents) {
                return;
            }

            var _coordsForEvent = coordsForEvent(evt),
                _coordsForEvent2 = _slicedToArray(_coordsForEvent, 1),
                x = _coordsForEvent2[0];

            // TODO(charlie): It doesn't seem to be guaranteed that every touch
            // event on `changedTouches` originates from the node through which this
            // touch event was sent. In that case, we'd be inappropriately reporting
            // the starting node ID.


            for (var i = 0; i < evt.changedTouches.length; i++) {
                this.gestureStateMachine.onTouchStart(function () {
                    return id;
                }, evt.changedTouches[i].identifier, x);
            }

            // If an event started in a view that we're managing, we'll handle it
            // all the way through.
            evt.preventDefault();
        }

        /**
         * Handle a touch-move event that originated in a node registered with the
         * gesture system.
         *
         * @param {TouchEvent} evt - the raw touch event from the browser
         */

    }, {
        key: 'onTouchMove',
        value: function onTouchMove(evt) {
            var _this2 = this;

            if (!this.trackEvents) {
                return;
            }

            var swipeLocked = this.popoverStateMachine.isPopoverVisible();
            var swipeEnabled = this.swipeEnabled && !swipeLocked;

            var _coordsForEvent3 = coordsForEvent(evt),
                _coordsForEvent4 = _slicedToArray(_coordsForEvent3, 2),
                x = _coordsForEvent4[0],
                y = _coordsForEvent4[1];

            for (var i = 0; i < evt.changedTouches.length; i++) {
                this.gestureStateMachine.onTouchMove(function () {
                    return _this2.nodeManager.idForCoords(x, y);
                }, evt.changedTouches[i].identifier, x, swipeEnabled);
            }
        }

        /**
         * Handle a touch-end event that originated in a node registered with the
         * gesture system.
         *
         * @param {TouchEvent} evt - the raw touch event from the browser
         */

    }, {
        key: 'onTouchEnd',
        value: function onTouchEnd(evt) {
            var _this3 = this;

            if (!this.trackEvents) {
                return;
            }

            var _coordsForEvent5 = coordsForEvent(evt),
                _coordsForEvent6 = _slicedToArray(_coordsForEvent5, 2),
                x = _coordsForEvent6[0],
                y = _coordsForEvent6[1];

            for (var i = 0; i < evt.changedTouches.length; i++) {
                this.gestureStateMachine.onTouchEnd(function () {
                    return _this3.nodeManager.idForCoords(x, y);
                }, evt.changedTouches[i].identifier, x);
            }
        }

        /**
         * Handle a touch-cancel event that originated in a node registered with the
         * gesture system.
         *
         * @param {TouchEvent} evt - the raw touch event from the browser
         */

    }, {
        key: 'onTouchCancel',
        value: function onTouchCancel(evt) {
            if (!this.trackEvents) {
                return;
            }

            for (var i = 0; i < evt.changedTouches.length; i++) {
                this.gestureStateMachine.onTouchCancel(evt.changedTouches[i].identifier);
            }
        }

        /**
         * Register a DOM node with a given identifier.
         *
         * @param {string} id - the identifier of the given node
         * @param {node} domNode - the DOM node linked to the identifier
         * @param {string[]} childIds - the identifiers of any DOM nodes that
         *                              should be considered children of this node,
         *                              in that they should take priority when
         *                              intercepting touch events
         * @param {object} borders - an opaque object describing the node's borders
         */

    }, {
        key: 'registerDOMNode',
        value: function registerDOMNode(id, domNode, childIds, borders) {
            this.nodeManager.registerDOMNode(id, domNode, childIds, borders);
            this.popoverStateMachine.registerPopover(id, childIds);
        }

        /**
         * Unregister the DOM node with the given identifier.
         *
         * @param {string} id - the identifier of the node to unregister
         */

    }, {
        key: 'unregisterDOMNode',
        value: function unregisterDOMNode(id) {
            this.nodeManager.unregisterDOMNode(id);
            this.popoverStateMachine.unregisterPopover(id);
        }

        /**
         * Enable event tracking for the gesture manager.
         */

    }, {
        key: 'enableEventTracking',
        value: function enableEventTracking() {
            this.trackEvents = true;
        }

        /**
         * Disable event tracking for the gesture manager. When called, the gesture
         * manager will drop any events received by managed nodes.
         */

    }, {
        key: 'disableEventTracking',
        value: function disableEventTracking() {
            this.trackEvents = false;
        }
    }]);

    return GestureManager;
}();

module.exports = GestureManager;