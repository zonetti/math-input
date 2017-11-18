"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The state machine that backs our gesture system. In particular, this state
 * machine manages the interplay between focuses, touch ups, and swiping.
 * It is entirely ignorant of the existence of popovers and the positions of
 * DOM nodes, operating solely on IDs. The state machine does accommodate for
 * multi-touch interactions, tracking gesture state on a per-touch basis.
 */

var defaults = {
    longPressWaitTimeMs: 50,
    swipeThresholdPx: 20,
    holdIntervalMs: 250
};

var GestureStateMachine = function () {
    function GestureStateMachine(handlers, options, swipeDisabledNodeIds, multiPressableKeys) {
        _classCallCheck(this, GestureStateMachine);

        this.handlers = handlers;
        this.options = _extends({}, defaults, options);
        this.swipeDisabledNodeIds = swipeDisabledNodeIds || [];
        this.multiPressableKeys = multiPressableKeys || [];

        // TODO(charlie): Flow-type this file. It's not great that we're now
        // passing around these opaque state objects.
        this.touchState = {};
        this.swipeState = null;
    }

    _createClass(GestureStateMachine, [{
        key: "_maybeCancelLongPressForTouch",
        value: function _maybeCancelLongPressForTouch(touchId) {
            var longPressTimeoutId = this.touchState[touchId].longPressTimeoutId;

            if (longPressTimeoutId) {
                clearTimeout(longPressTimeoutId);
                this.touchState[touchId] = _extends({}, this.touchState[touchId], {
                    longPressTimeoutId: null
                });
            }
        }
    }, {
        key: "_maybeCancelPressAndHoldForTouch",
        value: function _maybeCancelPressAndHoldForTouch(touchId) {
            var pressAndHoldIntervalId = this.touchState[touchId].pressAndHoldIntervalId;

            if (pressAndHoldIntervalId) {
                // If there was an interval set to detect holds, clear it out.
                clearInterval(pressAndHoldIntervalId);
                this.touchState[touchId] = _extends({}, this.touchState[touchId], {
                    pressAndHoldIntervalId: null
                });
            }
        }
    }, {
        key: "_cleanupTouchEvent",
        value: function _cleanupTouchEvent(touchId) {
            this._maybeCancelLongPressForTouch(touchId);
            this._maybeCancelPressAndHoldForTouch(touchId);
            delete this.touchState[touchId];
        }

        /**
         * Handle a focus event on the node with the given identifier, which may be
         * `null` to indicate that the user has dragged their finger off of any
         * registered nodes, but is still in the middle of a gesture.
         *
         * @param {string|null} id - the identifier of the newly focused node, or
         *                           `null` if no node is focused
         * @param {number} touchId - a unique identifier associated with the touch
         */

    }, {
        key: "_onFocus",
        value: function _onFocus(id, touchId) {
            var _this = this;

            // If we're in the middle of a long-press, cancel it.
            this._maybeCancelLongPressForTouch(touchId);

            // Reset any existing hold-detecting interval.
            this._maybeCancelPressAndHoldForTouch(touchId);

            // Set the focused node ID and handle the focus event.
            // Note: we can call `onFocus` with `null` IDs. The semantics of an
            // `onFocus` with a `null` ID differs from that of `onBlur`. The former
            // indicates that a gesture that can focus future nodes is still in
            // progress, but that no node is currently focused. The latter
            // indicates that the gesture has ended and nothing will be focused.
            this.touchState[touchId] = _extends({}, this.touchState[touchId], {
                activeNodeId: id
            });
            this.handlers.onFocus(id);

            if (id) {
                // Handle logic for repeating button presses.
                if (this.multiPressableKeys.includes(id)) {
                    // Start by triggering a click, iOS style.
                    this.handlers.onTrigger(id);

                    // Set up a new hold detector for the current button.
                    this.touchState[touchId] = _extends({}, this.touchState[touchId], {
                        pressAndHoldIntervalId: setInterval(function () {
                            // On every cycle, trigger the click handler.
                            _this.handlers.onTrigger(id);
                        }, this.options.holdIntervalMs)
                    });
                } else {
                    // Set up a new hold detector for the current button.
                    this.touchState[touchId] = _extends({}, this.touchState[touchId], {
                        longPressTimeoutId: setTimeout(function () {
                            _this.handlers.onLongPress(id);
                            _this.touchState[touchId] = _extends({}, _this.touchState[touchId], {
                                longPressTimeoutId: null
                            });
                        }, this.options.longPressWaitTimeMs)
                    });
                }
            }
        }

        /**
         * Clear out all active gesture information.
         */

    }, {
        key: "_onSwipeStart",
        value: function _onSwipeStart() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(this.touchState)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var activeTouchId = _step.value;

                    this._maybeCancelLongPressForTouch(activeTouchId);
                    this._maybeCancelPressAndHoldForTouch(activeTouchId);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.touchState = {};
            this.handlers.onBlur();
        }

        /**
         * A function that returns the identifier of the node over which the touch
         * event occurred. This is provided as a piece of lazy computation, as
         * computing the DOM node for a given point is expensive, and the state
         * machine won't always need that information. For example, if the user is
         * swiping, then `onTouchMove` needs to be performant and doesn't care about
         * the node over which the touch occurred.
         *
         * @typedef idComputation
         * @returns {DOMNode} - the identifier of the node over which the touch
         *                      occurred
         */

        /**
         * Handle a touch-start event on the node with the given identifer.
         *
         * @param {idComputation} getId - a function that returns identifier of the
         *                                node over which the start event occurred
         * @param {number} touchId - a unique identifier associated with the touch
         */

    }, {
        key: "onTouchStart",
        value: function onTouchStart(getId, touchId, pageX) {
            // Ignore any touch events that start mid-swipe.
            if (this.swipeState) {
                return;
            }

            if (this.touchState[touchId]) {
                // It turns out we can get multiple touch starts with no
                // intervening move, end, or cancel events in Android WebViews.
                // TODO(benkomalo): it's not entirely clear why this happens, but
                // it seems to happen with the backspace button. It may be related
                // to FastClick (https://github.com/ftlabs/fastclick/issues/71)
                // though I haven't verified, and it's probably good to be robust
                // here anyways.
                return;
            }

            var startingNodeId = getId();
            this.touchState[touchId] = {
                swipeLocked: this.swipeDisabledNodeIds.includes(startingNodeId),
                startX: pageX
            };

            this._onFocus(startingNodeId, touchId);
        }

        /**
         * Handle a touch-move event on the node with the given identifer.
         *
         * @param {idComputation} getId - a function that returns identifier of the
         *                                node over which the move event occurred
         * @param {number} touchId - a unique identifier associated with the touch
         * @param {number} pageX - the x coordinate of the touch
         * @param {boolean} swipeEnabled - whether the system should allow for
         *                                 transitions into a swiping state
         */

    }, {
        key: "onTouchMove",
        value: function onTouchMove(getId, touchId, pageX, swipeEnabled) {
            if (this.swipeState) {
                // Only respect the finger that started a swipe. Any other lingering
                // gestures are ignored.
                if (this.swipeState.touchId === touchId) {
                    this.handlers.onSwipeChange(pageX - this.swipeState.startX);
                }
            } else if (this.touchState[touchId]) {
                // It could be touch events started outside the keypad and
                // moved into it; ignore them.
                var _touchState$touchId = this.touchState[touchId],
                    activeNodeId = _touchState$touchId.activeNodeId,
                    startX = _touchState$touchId.startX,
                    swipeLocked = _touchState$touchId.swipeLocked;


                var dx = pageX - startX;
                var shouldBeginSwiping = swipeEnabled && !swipeLocked && Math.abs(dx) > this.options.swipeThresholdPx;

                if (shouldBeginSwiping) {
                    this._onSwipeStart();

                    // Trigger the swipe.
                    this.swipeState = {
                        touchId: touchId,
                        startX: startX
                    };
                    this.handlers.onSwipeChange(pageX - this.swipeState.startX);
                } else {
                    var id = getId();
                    if (id !== activeNodeId) {
                        this._onFocus(id, touchId);
                    }
                }
            }
        }

        /**
         * Handle a touch-end event on the node with the given identifer.
         *
         * @param {idComputation} getId - a function that returns identifier of the
         *                                node over which the end event occurred
         * @param {number} touchId - a unique identifier associated with the touch
         * @param {number} pageX - the x coordinate of the touch
         */

    }, {
        key: "onTouchEnd",
        value: function onTouchEnd(getId, touchId, pageX) {
            if (this.swipeState) {
                // Only respect the finger that started a swipe. Any other lingering
                // gestures are ignored.
                if (this.swipeState.touchId === touchId) {
                    this.handlers.onSwipeEnd(pageX - this.swipeState.startX);
                    this.swipeState = null;
                }
            } else if (this.touchState[touchId]) {
                // It could be touch events started outside the keypad and
                // moved into it; ignore them.
                var _touchState$touchId2 = this.touchState[touchId],
                    activeNodeId = _touchState$touchId2.activeNodeId,
                    pressAndHoldIntervalId = _touchState$touchId2.pressAndHoldIntervalId;


                this._cleanupTouchEvent(touchId);

                var didPressAndHold = !!pressAndHoldIntervalId;
                if (didPressAndHold) {
                    // We don't trigger a touch end if there was a press and hold,
                    // because the key has been triggered at least once and calling
                    // the onTouchEnd handler would add an extra trigger.
                    this.handlers.onBlur();
                } else {
                    // Trigger a touch-end. There's no need to notify clients of a
                    // blur as clients are responsible for handling any cleanup in
                    // their touch-end handlers.
                    this.handlers.onTouchEnd(activeNodeId);
                }
            }
        }

        /**
         * Handle a touch-cancel event.
         */

    }, {
        key: "onTouchCancel",
        value: function onTouchCancel(touchId) {
            // If a touch is cancelled and we're swiping, end the swipe with no
            // displacement.
            if (this.swipeState) {
                if (this.swipeState.touchId === touchId) {
                    this.handlers.onSwipeEnd(0);
                    this.swipeState = null;
                }
            } else if (this.touchState[touchId]) {
                // Otherwise, trigger a full blur. We don't want to trigger a
                // touch-up, since the cancellation means that the user probably
                // didn't release over a key intentionally.
                this._cleanupTouchEvent(touchId);
                this.handlers.onBlur();
            }
        }
    }]);

    return GestureStateMachine;
}();

module.exports = GestureStateMachine;