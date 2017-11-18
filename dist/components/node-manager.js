'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A manager for our node-to-ID system. In particular, this class is
 * responsible for maintaing a mapping between DOM nodes and node IDs, and
 * translating touch events from the raw positions at which they occur to the
 * nodes over which they are occurring. This differs from browser behavior, in
 * which touch events are only sent to the node in which a touch started.
 */

var NodeManager = function () {
    function NodeManager() {
        var _this = this;

        _classCallCheck(this, NodeManager);

        // A mapping from IDs to DOM nodes.
        this._nodesById = {};

        // A mapping from IDs to the borders around the DOM nodes, which can be
        // useful for layout purposes.
        this._bordersById = {};

        // An ordered list of IDs, where DOM nodes that are "higher" on the
        // page come earlier in the list. Note that an ID may be present in
        // this ordered list but not be registered to a DOM node (i.e., if it
        // is registered as a child of another DOM node, but hasn't appeared in
        // the DOM yet).
        this._orderedIds = [];

        // Cache bounding boxes aggressively, re-computing on page resize. Our
        // caching here makes the strict assumption that if a node is reasonably
        // assumed to be on-screen, its bounds won't change. For example, if we
        // see that a touch occurred within the bounds of a node, we cache those
        // bounds.
        // TODO(charlie): It'd be great if we could pre-compute these when the
        // page is idle and the keypad is visible (i.e., the nodes are in their
        // proper positions).
        this._cachedBoundingBoxesById = {};
        window.addEventListener('resize', function () {
            _this._cachedBoundingBoxesById = {};
        });
    }

    /**
     * Register a DOM node with a given identifier.
     *
     * @param {string} id - the identifier of the given node
     * @param {node} domNode - the DOM node linked to the identifier
     * @param {object} borders - an opaque object describing the node's borders
     */


    _createClass(NodeManager, [{
        key: 'registerDOMNode',
        value: function registerDOMNode(id, domNode, childIds, borders) {
            this._nodesById[id] = domNode;
            this._bordersById[id] = borders;

            // Make sure that any children appear first.
            // TODO(charlie): This is a very simplistic system that wouldn't
            // properly handle multiple levels of nesting.
            var allIds = [].concat(_toConsumableArray(childIds || []), [id], _toConsumableArray(this._orderedIds));

            // De-dupe the list of IDs.
            var orderedIds = [];
            var seenIds = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = allIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _id = _step.value;

                    if (!seenIds[_id]) {
                        orderedIds.push(_id);
                        seenIds[_id] = true;
                    }
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

            this._orderedIds = orderedIds;
        }

        /**
         * Unregister the DOM node with the given identifier.
         *
         * @param {string} id - the identifier of the node to unregister
         */

    }, {
        key: 'unregisterDOMNode',
        value: function unregisterDOMNode(id) {
            delete this._nodesById[id];
        }

        /**
         * Return the identifier of the topmost node located at the given
         * coordinates.
         *
         * @param {number} x - the x coordinate at which to search for a node
         * @param {number} y - the y coordinate at which to search for a node
         * @returns {null|string} - null or the identifier of the topmost node at
         *                          the given coordinates
         */

    }, {
        key: 'idForCoords',
        value: function idForCoords(x, y) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._orderedIds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var id = _step2.value;

                    var domNode = this._nodesById[id];
                    if (domNode) {
                        var bounds = domNode.getBoundingClientRect();
                        if (bounds.left <= x && bounds.right > x && bounds.top <= y && bounds.bottom > y) {
                            this._cachedBoundingBoxesById[id] = bounds;
                            return id;
                        }
                    }
                }
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
        }

        /**
         * Return the necessary layout information, including the bounds and border
         * values, for the node with the given identifier.
         *
         * @param {string} id - the identifier of the node for which to return the
         *                      layout information
         * @returns {object} - the bounding client rect for the given node, along
         *                     with its borders
         */

    }, {
        key: 'layoutPropsForId',
        value: function layoutPropsForId(id) {
            if (!this._cachedBoundingBoxesById[id]) {
                this._cachedBoundingBoxesById[id] = this._nodesById[id].getBoundingClientRect();
            }

            return {
                initialBounds: this._cachedBoundingBoxesById[id],
                borders: this._bordersById[id]
            };
        }
    }]);

    return NodeManager;
}();

module.exports = NodeManager;