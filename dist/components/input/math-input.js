'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
/* globals i18n */

var React = require('react');
var ReactDOM = require('react-dom');

var _require = require("aphrodite"),
    StyleSheet = _require.StyleSheet;

var i18n = require('../../lib/i18n');

var _require2 = require('../../fake-react-native-web'),
    View = _require2.View;

var CursorHandle = require('./cursor-handle');
var MathWrapper = require('./math-wrapper');
var scrollIntoView = require('./scroll-into-view');
var DragListener = require('./drag-listener');

var _require3 = require('../common-style'),
    cursorHandleRadiusPx = _require3.cursorHandleRadiusPx,
    cursorHandleDistanceMultiplier = _require3.cursorHandleDistanceMultiplier,
    gray76 = _require3.gray76;

var _require4 = require('../prop-types'),
    keypadElementPropType = _require4.keypadElementPropType;

var _require5 = require('../common-style'),
    brightGreen = _require5.brightGreen,
    gray17 = _require5.gray17;

var constrainingFrictionFactor = 0.8;

var rectContainsXY = function rectContainsXY(bounds, x, y) {
    return bounds.left <= x && bounds.right >= x && bounds.top <= y && bounds.bottom >= y;
};

var MathInput = function (_React$Component) {
    _inherits(MathInput, _React$Component);

    function MathInput() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MathInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MathInput.__proto__ || Object.getPrototypeOf(MathInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            focused: false,
            handle: {
                animateIntoPosition: false,
                visible: false,
                x: 0,
                y: 0
            }
        }, _this._clearKeypadBoundsCache = function (keypadNode) {
            _this._keypadBounds = null;
        }, _this._cacheKeypadBounds = function (keypadNode) {
            _this._keypadBounds = keypadNode.getBoundingClientRect();
        }, _this._getKeypadBounds = function () {
            if (!_this._keypadBounds) {
                var node = ReactDOM.findDOMNode(_this.props.keypadElement);
                _this._cacheKeypadBounds(node);
            }
            return _this._keypadBounds;
        }, _this._updateCursorHandle = function (animateIntoPosition) {
            var containerBounds = _this._container.getBoundingClientRect();
            var cursor = _this._container.querySelector('.mq-cursor');
            var cursorBounds = cursor.getBoundingClientRect();

            var cursorWidth = cursorBounds.width;
            var gapBelowCursor = 2;

            _this.setState({
                handle: {
                    visible: true,
                    animateIntoPosition: animateIntoPosition,
                    // We subtract containerBounds' left/top to correct for the
                    // position of the container within the page.
                    x: cursorBounds.left + cursorWidth / 2 - containerBounds.left,
                    y: cursorBounds.bottom + gapBelowCursor - containerBounds.top
                }
            });
        }, _this._hideCursorHandle = function () {
            _this.setState({
                handle: {
                    visible: false,
                    x: 0,
                    y: 0
                }
            });
        }, _this._forwardGlobalKeydown = function (e) {
            if (e.keyCode === 13 || e.keyCode === 27) {
                // Enter, Esc
                _this.props.keypadElement.dismiss();
                return;
            }
            if (e.fakeForMathquill) {
                return;
            }
            var e2 = new KeyboardEvent(e.type, e);
            Object.defineProperty(e2, 'keyCode', { get: function get() {
                    return e.keyCode;
                } });
            Object.defineProperty(e2, 'charCode', { get: function get() {
                    return e.charCode;
                } });
            Object.defineProperty(e2, 'which', { get: function get() {
                    return e.which;
                } });
            e2.fakeForMathquill = true;
            _this.mathField.fakeTextarea.value = '';
            _this.mathField.fakeTextarea.dispatchEvent(e2);
            _this._postKeyEvent();
        }, _this._forwardGlobalKeypress = function (e) {
            if (e.fakeForMathquill) {
                return;
            }
            // Don't allow spaces, since they invalidate a lot of expressions in our grader
            if (e.charCode === 32) {
                return;
            }
            var e2 = new KeyboardEvent(e.type, e);
            Object.defineProperty(e2, 'keyCode', { get: function get() {
                    return e.keyCode;
                } });
            Object.defineProperty(e2, 'charCode', { get: function get() {
                    return e.charCode;
                } });
            Object.defineProperty(e2, 'which', { get: function get() {
                    return e.which;
                } });
            e2.fakeForMathquill = true;
            _this.mathField.fakeTextarea.value = String.fromCharCode(e.charCode);
            _this.mathField.fakeTextarea.dispatchEvent(e2);
            // Mathquill seems to not be fully initialized for the first time this is called;
            // this prevents the first keypress from being "lost"
            // TODO(Aria): understand why.
            setTimeout(_this._postKeyEvent, 0);
        }, _this.blur = function () {
            window.removeEventListener('keydown', _this._forwardGlobalKeydown);
            window.removeEventListener('keypress', _this._forwardGlobalKeypress);
            _this.mathField.blur();
            _this.props.onBlur && _this.props.onBlur();
            _this.setState({ focused: false, handle: { visible: false } });
        }, _this._postKeyEvent = function () {
            // Trigger an `onChange` if the value in the input changed, and hide
            // the cursor handle whenever the user types a key. If the value
            // changed as a result of a keypress, we need to be careful not to
            // call `setState` until after `onChange` has resolved.
            var hideCursor = function hideCursor() {
                _this.setState({
                    handle: {
                        visible: false
                    }
                });
            };
            var value = _this.mathField.getContent();
            if (_this.props.value !== value) {
                _this.props.onChange(value, hideCursor);
            } else {
                hideCursor();
            }
        }, _this.focus = function () {
            var waitUntilPossible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (!_this.props.keypadElement && waitUntilPossible) {
                return setTimeout(function () {
                    return _this.focus(true);
                });
            }
            window.addEventListener('keydown', _this._forwardGlobalKeydown);
            window.addEventListener('keypress', _this._forwardGlobalKeypress);
            // Pass this component's handleKey method to the keypad so it can call
            // it whenever it needs to trigger a keypress action.
            _this.props.keypadElement.setKeyHandler(function (key) {
                var cursor = _this.mathField.pressKey(key);
                _this._postKeyEvent();
                return cursor;
            });

            _this.mathField.focus();
            _this.props.onFocus && _this.props.onFocus();
            _this.setState({ focused: true }, function () {
                // NOTE(charlie): We use `setTimeout` to allow for a layout pass to
                // occur. Otherwise, the keypad is measured incorrectly. Ideally,
                // we'd use requestAnimationFrame here, but it's unsupported on
                // Android Browser 4.3.
                setTimeout(function () {
                    if (_this._isMounted) {
                        // TODO(benkomalo): the keypad is animating at this point,
                        // so we can't call _cacheKeypadBounds(), even though
                        // it'd be nice to do so. It should probably be the case
                        // that the higher level controller tells us when the
                        // keypad is settled (then scrollIntoView wouldn't have
                        // to make assumptions about that either).
                        var maybeKeypadNode = _this.props.keypadElement && ReactDOM.findDOMNode(_this.props.keypadElement);
                        scrollIntoView(_this._container, maybeKeypadNode);
                    }
                });
            });
        }, _this._findHitNode = function (containerBounds, x, y, dx, dy) {
            while (y >= containerBounds.top && y <= containerBounds.bottom) {
                y += dy;

                var points = [[x - dx, y], [x, y], [x + dx, y]];

                var elements = points.map(function (point) {
                    var _document;

                    return (_document = document).elementFromPoint.apply(_document, _toConsumableArray(point));
                })
                // We exclude the root container itself and any nodes marked
                // as non-leaf which are fractions, parens, and roots.  The
                // children of those nodes are included in the list because
                // those are the items we care about placing the cursor next
                // to.
                //
                // MathQuill's mq-non-leaf is not applied to all non-leaf nodes
                // so the naming is a bit confusing.  Although fractions are
                // included, neither mq-numerator nor mq-denominator nodes are
                // and neither are subscripts or superscripts.
                .filter(function (element) {
                    return element && _this._root.contains(element) && (!element.classList.contains('mq-root-block') && !element.classList.contains('mq-non-leaf') || element.classList.contains('mq-empty') || element.classList.contains('mq-hasCursor'));
                });

                var hitNode = null;

                // Contains only DOMNodes without child elements.  These should
                // contain some amount of text though.
                var leafElements = [];

                // Contains only DOMNodes with child elements.
                var nonLeafElements = [];

                var max = 0;
                var counts = {};
                var elementsById = {};

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var element = _step.value;

                        var id = element.getAttribute('mathquill-command-id');
                        if (id != null) {
                            leafElements.push(element);

                            counts[id] = (counts[id] || 0) + 1;
                            elementsById[id] = element;
                        } else {
                            nonLeafElements.push(element);
                        }
                    }

                    // When determining which DOMNode to place the cursor beside, we
                    // prefer leaf nodes.  Hitting a leaf node is a good sign that the
                    // cursor is really close to some piece of math that has been
                    // rendered because leaf nodes contain text.  Non-leaf nodes may
                    // contain a lot of whitespace so the cursor may be further away
                    // from actual text within the expression.
                    //
                    // Since we're doing three hit tests per loop it's possible that
                    // we hit multiple leaf nodes at the same time.  In this case we
                    // we prefer the DOMNode with the most hits.
                    // TODO(kevinb) consider preferring nodes hit by [x, y].
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

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = Object.entries(counts)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _step2$value = _slicedToArray(_step2.value, 2),
                            _id = _step2$value[0],
                            count = _step2$value[1];

                        if (count > max) {
                            max = count;
                            hitNode = elementsById[_id];
                        }
                    }

                    // It's possible that two non-leaf nodes are right beside each
                    // other.  We don't bother counting the number of hits for each,
                    // b/c this seems like an unlikely situation.  Also, ignoring the
                    // hit count in the situation should not have serious effects on
                    // the overall accuracy of the algorithm.
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                if (hitNode == null && nonLeafElements.length > 0) {
                    hitNode = nonLeafElements[0];
                }

                if (hitNode !== null) {
                    _this.mathField.setCursorPosition(x, y, hitNode);
                    return true;
                }
            }

            return false;
        }, _this._insertCursorAtClosestNode = function (x, y) {
            var cursor = _this.mathField.getCursor();

            // Pre-emptively check if the input has any child nodes; if not, the
            // input is empty, so we throw the cursor at the start.
            if (!_this._root.hasChildNodes()) {
                cursor.insAtLeftEnd(_this.mathField.mathField.__controller.root);
                return;
            }

            if (y > _this._containerBounds.bottom) {
                y = _this._containerBounds.bottom;
            } else if (y < _this._containerBounds.top) {
                y = _this._containerBounds.top + 10;
            }

            var dy = void 0;

            // Vertical spacing between hit tests
            // dy is negative because we're moving upwards.
            dy = -8;

            // Horizontal spacing between hit tests
            // Note: This value depends on the font size.  If the gap is too small
            // we end up placing the cursor at the end of the expression when we
            // shouldn't.
            var dx = 5;

            if (_this._findHitNode(_this._containerBounds, x, y, dx, dy)) {
                return;
            }

            // If we haven't found anything start from the top.
            y = _this._containerBounds.top;

            // dy is positive b/c we're going downwards.
            dy = 8;

            if (_this._findHitNode(_this._containerBounds, x, y, dx, dy)) {
                return;
            }

            var firstChildBounds = _this._root.firstChild.getBoundingClientRect();
            var lastChildBounds = _this._root.lastChild.getBoundingClientRect();

            var left = firstChildBounds.left;
            var right = lastChildBounds.right;

            // We've exhausted all of the options. We're likely either to the right
            // or left of all of the math, so we place the cursor at the end to
            // which it's closest.
            if (Math.abs(x - right) < Math.abs(x - left)) {
                cursor.insAtRightEnd(_this.mathField.mathField.__controller.root);
            } else {
                cursor.insAtLeftEnd(_this.mathField.mathField.__controller.root);
            }
            // In that event, we need to update the cursor context ourselves.
            _this.props.keypadElement && _this.props.keypadElement.setCursor({
                context: _this.mathField.contextForCursor(cursor)
            });
        }, _this.handleTouchStart = function (e) {
            // Propagating touch events breaks zoom things; not propagating
            // mouse events breaks switching between inputs.
            // TODO(aria): Figure out how to simplify this for everything
            if (!e.isMouseEvent) {
                e.stopPropagation();
            }

            // Hide the cursor handle on touch start, if the handle itself isn't
            // handling the touch event.
            _this._hideCursorHandle();

            // Cache the container bounds, so as to avoid re-computing. If we don't
            // have any content, then it's not necessary, since the cursor can't be
            // moved anyway.
            if (_this.mathField.getContent() !== "") {
                _this._containerBounds = _this._container.getBoundingClientRect();

                // Make the cursor visible and set the handle-less cursor's
                // location.
                var touch = e.changedTouches[0];
                _this._insertCursorAtClosestNode(touch.clientX, touch.clientY);
            }

            // Trigger a focus event, if we're not already focused.
            if (!_this.state.focused) {
                _this.focus();
            }
        }, _this.handleTouchMove = function (e) {
            // Propagating touch events breaks zoom things; not propagating
            // mouse events breaks switching between inputs.
            // TODO(aria): Figure out how to simplify this for everything
            if (!e.isMouseEvent) {
                e.stopPropagation();
            }

            // Update the handle-less cursor's location on move, if there's any
            // content in the box. Note that if the user touched outside the keypad
            // (e.g., with a different finger) during this touch interaction, we
            // may have blurred, in which case we should ignore the touch (since
            // the cursor is no longer visible and the input is no longer
            // highlighted).
            if (_this.mathField.getContent() !== "" && _this.state.focused) {
                var touch = e.changedTouches[0];
                _this._insertCursorAtClosestNode(touch.clientX, touch.clientY);
            }
        }, _this.handleTouchEnd = function (e) {
            // Propagating touch events breaks zoom things; not propagating
            // mouse events breaks switching between inputs.
            // TODO(aria): Figure out how to simplify this for everything
            if (!e.isMouseEvent) {
                e.stopPropagation();
            }

            // And on touch-end, reveal the cursor, unless the input is empty. Note
            // that if the user touched outside the keypad (e.g., with a different
            // finger) during this touch interaction, we may have blurred, in which
            // case we should ignore the touch (since the cursor is no longer
            // visible and the input is no longer highlighted).
            if (_this.mathField.getContent() !== "" && _this.state.focused) {
                _this._updateCursorHandle();
            }
        }, _this.onCursorHandleTouchStart = function (e) {
            // NOTE(charlie): The cursor handle is a child of this view, so whenever
            // it receives a touch event, that event would also typically be bubbled
            // up to our own handlers. However, we want the cursor to handle its own
            // touch events, and for this view to only handle touch events that
            // don't affect the cursor. As such, we `stopPropagation` on any touch
            // events that are being handled by the cursor, so as to avoid handling
            // them in our own touch handlers.
            e.stopPropagation();

            e.preventDefault();

            // Cache the container bounds, so as to avoid re-computing.
            _this._containerBounds = _this._container.getBoundingClientRect();
        }, _this._constrainToBound = function (value, min, max, friction) {
            if (value < min) {
                return min + (value - min) * friction;
            } else if (value > max) {
                return max + (value - max) * friction;
            } else {
                return value;
            }
        }, _this.onCursorHandleTouchMove = function (e) {
            e.stopPropagation();

            var x = e.changedTouches[0].clientX;
            var y = e.changedTouches[0].clientY;

            var relativeX = x - _this._containerBounds.left;
            var relativeY = y - 2 * cursorHandleRadiusPx * cursorHandleDistanceMultiplier - _this._containerBounds.top;

            // We subtract the containerBounds left/top to correct for the
            // MathInput's position on the page. On top of that, we subtract an
            // additional 2 x {height of the cursor} so that the bottom of the
            // cursor tracks the user's finger, to make it visible under their
            // touch.
            _this.setState({
                handle: {
                    animateIntoPosition: false,
                    visible: true,
                    // TODO(charlie): Use clientX and clientY to avoid the need for
                    // scroll offsets. This likely also means that the cursor
                    // detection doesn't work when scrolled, since we're not
                    // offsetting those values.
                    x: _this._constrainToBound(relativeX, 0, _this._containerBounds.width, constrainingFrictionFactor),
                    y: _this._constrainToBound(relativeY, 0, _this._containerBounds.height, constrainingFrictionFactor)
                }
            });

            // Use a y-coordinate that's just above where the user is actually
            // touching because they're dragging the handle which is a little
            // below where the cursor actually is.
            var distanceAboveFingerToTrySelecting = 22;
            var adjustedY = y - distanceAboveFingerToTrySelecting;

            _this._insertCursorAtClosestNode(x, adjustedY);
        }, _this.onCursorHandleTouchEnd = function (e) {
            e.stopPropagation();

            _this._updateCursorHandle(true);
        }, _this.onCursorHandleTouchCancel = function (e) {
            e.stopPropagation();

            _this._updateCursorHandle(true);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MathInput, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this._isMounted = true;

            this.mathField = new MathWrapper(this._mathContainer, {}, {
                onCursorMove: function onCursorMove(cursor) {
                    // TODO(charlie): It's not great that there is so much coupling
                    // between this keypad and the input behavior. We should wrap
                    // this `MathInput` component in an intermediary component
                    // that translates accesses on the keypad into vanilla props,
                    // to make this input keypad-agnostic.
                    _this2.props.keypadElement && _this2.props.keypadElement.setCursor(cursor);
                }
            });

            // NOTE(charlie): MathQuill binds this handler to manage its
            // drag-to-select behavior. For reasons that I can't explain, the event
            // itself gets triggered even if you tap slightly outside of the
            // bound container (maybe 5px outside of any boundary). As a result, the
            // cursor appears when tapping at those locations, even though the input
            // itself doesn't receive any touch start or mouse down event and, as
            // such, doesn't focus itself. This makes for a confusing UX, as the
            // cursor appears, but the keypad does not and the input otherwise
            // treats itself as unfocused. Thankfully, we don't need this behavior--
            // we manage all of the cursor interactions ourselves--so we can safely
            // unbind the handler.
            this.mathField.mathField.__controller.container.unbind('mousedown.mathquill');

            // NOTE(charlie): MathQuill uses this method to do some layout in the
            // case that an input overflows its bounds and must become scrollable.
            // As it causes layout jank due to jQuery animations of scroll
            // properties, we disable it unless it is explicitly requested (as it
            // should be in the case of a fixed-width input).
            if (!this.props.scrollable) {
                this.mathField.mathField.__controller.scrollHoriz = function () {};
            }

            this.mathField.setContent(this.props.value);

            this._container = ReactDOM.findDOMNode(this);

            this._root = this._container.querySelector('.mq-root-block');
            this._root.style.fontSize = fontSizePt + 'pt';

            // Record the initial scroll displacement on touch start. This allows
            // us to detect whether a touch event was a scroll and only blur the
            // input on non-scrolls--blurring the input on scroll makes for a
            // frustrating user experience.
            this.touchStartInitialScroll = null;
            this.recordTouchStartOutside = function (evt) {
                if (_this2.state.focused) {
                    // Only blur if the touch is both outside of the input, and
                    // above or to the left or right of the keypad (if it has been
                    // provided). The reasoning for not blurring when touches occur
                    // below the keypad is that the keypad may be anchored above
                    // the 'Check answer' bottom bar, in which case, we don't want
                    // to dismiss the keypad on check.
                    // TODO(charlie): Inject this logic.
                    if (!_this2._container.contains(evt.target)) {
                        var touchDidStartInOrBelowKeypad = false;
                        if (_this2.props.keypadElement) {
                            var bounds = _this2._getKeypadBounds();
                            for (var i = 0; i < evt.changedTouches.length; i++) {
                                var _ref2 = [evt.changedTouches[i].clientX, evt.changedTouches[i].clientY],
                                    x = _ref2[0],
                                    y = _ref2[1];

                                if (rectContainsXY(bounds, x, y) || bounds.bottom < y) {
                                    touchDidStartInOrBelowKeypad = true;
                                    break;
                                }
                            }
                        }

                        if (!touchDidStartInOrBelowKeypad) {
                            _this2.didTouchOutside = true;

                            if (_this2.dragListener) {
                                _this2.dragListener.detach();
                            }

                            _this2.dragListener = new DragListener(function () {
                                _this2.didScroll = true;
                                _this2.dragListener.detach();
                            }, evt);
                            _this2.dragListener.attach();
                        }
                    }
                }
            };

            this.blurOnTouchEndOutside = function (evt) {
                // If the user didn't scroll, blur the input.
                // TODO(charlie): Verify that the touch that ended actually started
                // outside the keypad. Right now, you can touch down on the keypad,
                // touch elsewhere, release the finger on the keypad, and trigger a
                // dismissal. This code needs to be generalized to handle
                // multi-touch.
                if (_this2.state.focused && _this2.didTouchOutside && !_this2.didScroll) {
                    _this2.blur();
                }

                _this2.didTouchOutside = false;
                _this2.didScroll = false;

                if (_this2.dragListener) {
                    _this2.dragListener.detach();
                    _this2.removeListeners = null;
                }
            };

            this.blurOnClickOutside = function (evt) {
                var x = evt.clientX;
                var y = evt.clientY;
                var containerBounds = _this2._container.getBoundingClientRect();
                if (_this2.state.focused && !rectContainsXY(containerBounds, x, y)) {
                    var isOutside = true;
                    if (_this2.props.keypadElement) {
                        var bounds = _this2._getKeypadBounds();
                        if (rectContainsXY(bounds, x, y) || bounds.bottom < y) {
                            isOutside = false;
                        }
                    }
                    if (isOutside) {
                        _this2.blur();
                    }
                }
                _this2.didTouchOutside = false;
                _this2.didScroll = false;
            };

            window.addEventListener('touchstart', this.recordTouchStartOutside);
            window.addEventListener('touchend', this.blurOnTouchEndOutside);
            window.addEventListener('touchcancel', this.blurOnTouchEndOutside);
            window.addEventListener('click', this.blurOnClickOutside);
            window.addEventListener('mousedown', this.blurOnClickOutside);

            // HACK(benkomalo): if the window resizes, the keypad bounds can
            // change. That's a bit peeking into the internals of the keypad
            // itself, since we know bounds can change only when the viewport
            // changes, but seems like a rare enough thing to get wrong that it's
            // not worth wiring up extra things for the technical "purity" of
            // having the keypad notify of changes to us.
            window.addEventListener('resize', this._clearKeypadBoundsCache);
            window.addEventListener('orientationchange', this._clearKeypadBoundsCache);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (this.props.keypadElement !== props.keypadElement) {
                this._clearKeypadBoundsCache();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.mathField.getContent() !== this.props.value) {
                this.mathField.setContent(this.props.value);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._isMounted = false;

            window.removeEventListener('touchstart', this.recordTouchStartOutside);
            window.removeEventListener('touchend', this.blurOnTouchEndOutside);
            window.removeEventListener('touchcancel', this.blurOnTouchEndOutside);
            window.removeEventListener('resize', this._clearKeypadBoundsCache);
            window.removeEventListener('orientationchange', this._clearKeypadBoundsCache);
            window.removeEventListener('keydown', this._forwardGlobalKeydown);
            window.removeEventListener('keypress', this._forwardGlobalKeypress);
            window.removeEventListener('click', this.blurOnClickOutside);
        }

        /** Gets and cache they bounds of the keypadElement */


        /**
         * Tries to determine which DOM node to place the cursor next to based on
         * where the user drags the cursor handle.  If it finds a node it will
         * place the cursor next to it, update the handle to be under the cursor,
         * and return true.  If it doesn't find a node, it returns false.
         *
         * It searches for nodes by doing it tests at the following points:
         *
         *   (x - dx, y), (x, y), (x + dx, y)
         *
         * If it doesn't find any nodes from the rendered math it will update y
         * by adding dy.
         *
         * The algorithm ends its search when y goes outside the bounds of
         * containerBounds.
         *
         * @param {ClientRect} containerBounds - bounds of the container node
         * @param {number} x - the initial x coordinate in the viewport
         * @param {number} y - the initial y coordinate in the viewport
         * @param {number} dx - horizontal spacing between elementFromPoint calls
         * @param {number} dy - vertical spacing between elementFromPoint calls,
         *                      sign determines direction.
         * @returns {boolean} - true if a node was hit, false otherwise.
         */


        /**
         * Inserts the cursor at the DOM node closest to the given coordinates,
         * based on hit-tests conducted using #_findHitNode.
         *
         * @param {number} x - the x coordinate in the viewport
         * @param {number} y - the y coordinate in the viewport
         */


        /**
         * When a touch starts in the cursor handle, we track it so as to avoid
         * handling any touch events ourself.
         *
         * @param {TouchEvent} e - the raw touch event from the browser
         */


        /**
         * When the user moves the cursor handle update the position of the cursor
         * and the handle.
         *
         * @param {TouchEvent} e - the raw touch event from the browser
         */


        /**
         * When the user releases the cursor handle, animate it back into place.
         *
         * @param {TouchEvent} e - the raw touch event from the browser
         */


        /**
         * If the gesture is cancelled mid-drag, simply hide it.
         *
         * @param {TouchEvent} e - the raw touch event from the browser
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                focused = _state.focused,
                handle = _state.handle;
            var style = this.props.style;

            // Calculate the appropriate padding based on the border width (which is
            // considered 'padding', since we're using 'border-box') and the fact
            // that MathQuill automatically applies 2px of padding to the inner
            // input.

            var normalBorderWidthPx = 1;
            var focusedBorderWidthPx = 2;
            var borderWidthPx = this.state.focused ? focusedBorderWidthPx : normalBorderWidthPx;
            var builtInMathQuillPadding = 2;
            var paddingInset = totalDesiredPadding - borderWidthPx - builtInMathQuillPadding;

            // Now, translate that to the appropriate padding for each direction.
            // The complication here is that we want numerals to be centered within
            // the input. However, Symbola (MathQuill's font of choice) renders
            // numerals with approximately 3px of padding below and 1px of padding
            // above (to make room for ascenders and descenders). So we ignore those
            // padding values for the vertical directions.
            var symbolaPaddingBottom = 3;
            var symbolaPaddingTop = 1;
            var padding = {
                paddingTop: paddingInset - symbolaPaddingTop,
                paddingRight: paddingInset,
                paddingBottom: paddingInset - symbolaPaddingBottom,
                paddingLeft: paddingInset
            };

            var innerStyle = _extends({}, inlineStyles.innerContainer, {
                borderWidth: borderWidthPx
            }, padding, focused ? { borderColor: this.props.borderColor || brightGreen } : {}, style);

            return React.createElement(
                View,
                {
                    style: styles.input,
                    onTouchStart: this.handleTouchStart,
                    onTouchMove: this.handleTouchMove,
                    onTouchEnd: this.handleTouchEnd,
                    onClick: function onClick(e) {
                        return null;
                    },
                    role: 'textbox',
                    ariaLabel: i18n._('Math input box')
                },
                React.createElement(
                    'div',
                    { className: 'keypad-input' },
                    React.createElement('div', {
                        ref: function ref(node) {
                            _this3._mathContainer = ReactDOM.findDOMNode(node);
                        },
                        style: innerStyle
                    })
                ),
                focused && handle.visible && React.createElement(CursorHandle, _extends({}, handle, {
                    onTouchStart: this.onCursorHandleTouchStart,
                    onTouchMove: this.onCursorHandleTouchMove,
                    onTouchEnd: this.onCursorHandleTouchEnd,
                    onTouchCancel: this.onCursorHandleTouchCancel
                }))
            );
        }
    }]);

    return MathInput;
}(React.Component);

MathInput.propTypes = {
    borderColor: PropTypes.string,
    // The React element node associated with the keypad that will send
    // key-press events to this input. If provided, this can be used to:
    //   (1) Avoid blurring the input, on user interaction with the keypad.
    //   (2) Scroll the input into view, if it would otherwise be obscured
    //       by the keypad on focus.
    keypadElement: keypadElementPropType,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    // Whether the input should be scrollable. This is typically only
    // necessary when a fixed width has been provided through the `style`
    // prop.
    scrollable: PropTypes.bool,
    // An extra, vanilla style object, to be applied to the math input.
    style: PropTypes.any,
    value: PropTypes.string
};
MathInput.defaultProps = {
    scrollable: false,
    style: {},
    value: ""
};


var fontSizePt = 18;

// The height of numerals in Symbola (rendered at 18pt) is about 20px (though
// they render at 24px due to padding for ascenders and descenders). We want our
// box to be laid out such that there's 8px of padding between a numeral and the
// edge of the input, so we use this 20px number as our 'base height' and
// account for the ascender and descender padding when computing the additional
// padding in our `render` method.
var numeralHeightPx = 20;
var totalDesiredPadding = 8;
var minHeightPx = numeralHeightPx + totalDesiredPadding * 2;
var minWidthPx = 64;

var styles = StyleSheet.create({
    input: {
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'middle'
    }
});

var inlineStyles = {
    // Styles for the inner, MathQuill-ified input element. It's important that
    // these are done with regular inline styles rather than Aphrodite classes
    // as MathQuill adds CSS class names to the element outside of the typical
    // React flow; assigning a class to the element can thus disrupt MathQuill
    // behavior. For example, if the client provided new styles to be applied
    // on focus and the styles here were applied with Aphrodite, then Aphrodite
    // would merge the provided styles with the base styles here, producing a
    // new CSS class name that we would apply to the element, clobbering any CSS
    // class names that MathQuill had applied itself.
    innerContainer: {
        backgroundColor: 'white',
        display: 'flex',
        minHeight: minHeightPx,
        minWidth: minWidthPx,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        borderStyle: 'solid',
        borderColor: gray76,
        borderRadius: 4,
        color: gray17
    }
};

module.exports = MathInput;