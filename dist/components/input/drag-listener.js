'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A gesture recognizer that detects 'drags', crudely defined as either scrolls
 * or touches that move a sufficient distance.
 */

// The 'slop' factor, after which we consider the use to be dragging. The value
// is taken from the Android SDK. It won't be robust to page zoom and the like,
// but it should be good enough for our purposes.
var touchSlopPx = 8;

var DragListener = function () {
    function DragListener(onDrag, initialEvent) {
        _classCallCheck(this, DragListener);

        // We detect drags in two ways. First, by listening for the window
        // scroll event (we consider any legitimate scroll to be a drag).
        this._scrollListener = function () {
            onDrag();
        };

        // And second, by listening for touch moves and tracking the each
        // finger's displacement. This allows us to track, e.g., when the user
        // scrolls within an individual view.
        var touchLocationsById = {};
        for (var i = 0; i < initialEvent.changedTouches.length; i++) {
            var touch = initialEvent.changedTouches[i];
            touchLocationsById[touch.identifier] = [touch.clientX, touch.clientY];
        }

        this._moveListener = function (evt) {
            for (var _i = 0; _i < evt.changedTouches.length; _i++) {
                var _touch = evt.changedTouches[_i];
                var initialTouchLocation = touchLocationsById[_touch.identifier];
                if (initialTouchLocation) {
                    var touchLocation = [_touch.clientX, _touch.clientY];
                    var dx = touchLocation[0] - initialTouchLocation[0];
                    var dy = touchLocation[1] - initialTouchLocation[1];

                    var squaredDist = dx * dx + dy * dy;
                    var squaredTouchSlop = touchSlopPx * touchSlopPx;

                    if (squaredDist > squaredTouchSlop) {
                        onDrag();
                    }
                }
            }
        };

        // Clean-up any terminated gestures, since some browsers reuse
        // identifiers.
        this._endAndCancelListener = function (evt) {
            for (var _i2 = 0; _i2 < evt.changedTouches.length; _i2++) {
                delete touchLocationsById[evt.changedTouches[_i2].identifier];
            }
        };
    }

    _createClass(DragListener, [{
        key: 'attach',
        value: function attach() {
            window.addEventListener('scroll', this._scrollListener);
            window.addEventListener('touchmove', this._moveListener);
            window.addEventListener('touchend', this._endAndCancelListener);
            window.addEventListener('touchcancel', this._endAndCancelListener);
        }
    }, {
        key: 'detach',
        value: function detach() {
            window.removeEventListener('scroll', this._scrollListener);
            window.removeEventListener('touchmove', this._moveListener);
            window.removeEventListener('touchend', this._endAndCancelListener);
            window.removeEventListener('touchcancel', this._endAndCancelListener);
        }
    }]);

    return DragListener;
}();

module.exports = DragListener;