'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A system for tracking gesture velocity in a single dimension.
 *
 * Velocity is computed by smoothing linearly over the gestures that have
 * occurred in the last 100 milliseconds.
 */

var now = require('performance-now');

var VelocityTracker = function () {
    function VelocityTracker(options) {
        _classCallCheck(this, VelocityTracker);

        this.options = _extends({
            velocityTimeout: 100
        }, options);
        this._events = [];
    }

    /**
     * Pushes an event with the given displacement onto the event buffer,
     * associating it with a timestamp. Note that, as this method computes the
     * timestamp for the event at calltime, it should be called immediately
     * after the event occurs.
     *
     * @param {number} x - the cumulative displacement of the event
     */


    _createClass(VelocityTracker, [{
        key: 'push',
        value: function push(x) {
            this._events.push({
                x: x,
                t: now()
            });
        }

        /**
         * Compute the velocity with respect to the events that have been tracked
         * by the system. Velocity is computed by smoothing linearly over recent
         * displacement values.
         *
         * Note that, for performance reasons, a call to `getVelocity` will clear
         * out the event buffer. As such, repeated calls will not return the same
         * value (in particular, a second call in quick succession will return 0).
         *
         * @returns {number} the velocity associated with the tracker
         */

    }, {
        key: 'getVelocity',
        value: function getVelocity() {
            var events = this._getEvents();

            if (events.length < 2) {
                return 0;
            } else {
                var current = events[events.length - 1];
                var first = events[0];
                var dt = current.t - first.t;
                return (current.x - first.x) / dt;
            }
        }

        /**
         * Filter the tracked events to exclude any events that occurred too far in
         * the past, and reset the event buffer.
         *
         * @returns {number[]} an array of displacements corresponding to events
         *                     that occurred in the past `velocityTimeout`
         *                     milliseconds
         */

    }, {
        key: '_getEvents',
        value: function _getEvents() {
            var threshold = now() - this.options.velocityTimeout;
            var recentEvents = this._events.filter(function (event) {
                return event.t > threshold;
            });
            this._events = [];
            return recentEvents;
        }
    }]);

    return VelocityTracker;
}();

module.exports = VelocityTracker;