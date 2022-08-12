'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var _require = require('aphrodite'),
    StyleSheet = _require.StyleSheet,
    css = _require.css;

var View = function (_React$Component) {
    _inherits(View, _React$Component);

    function View() {
        _classCallCheck(this, View);

        return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
    }

    _createClass(View, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = css.apply(undefined, [View.styles.initial].concat(_toConsumableArray(Array.isArray(this.props.style) ? this.props.style : [this.props.style]))) + (this.props.extraClassName ? ' ' + this.props.extraClassName : "");

            return React.createElement(
                'div',
                {
                    className: className,
                    style: this.props.dynamicStyle,
                    onClick: this.props.onClick,
                    onTouchCancel: this.props.onTouchCancel,
                    onTouchEnd: this.props.onTouchEnd,
                    onTouchMove: this.props.onTouchMove,
                    onTouchStart: this.props.onTouchStart,
                    onMouseDown: function onMouseDown(e) {
                        // Touch events have extra properties compared to mouse
                        // events and also have a concept of "pointer lock",
                        // where the element that receives the touchstart event
                        // receives all subsequent events for that same touch,
                        // whereas mouse events change target if the cursor
                        // moves. We take mouse events and pretend they're touch
                        // events.
                        var augmentMouseEvent = function augmentMouseEvent(e) {
                            e.touches = e.changedTouches = [{
                                identifier: 1,
                                clientX: e.clientX,
                                clientY: e.clientY
                            }];
                            e.isMouseEvent = true;
                        };

                        var doc = _this2._div.ownerDocument;
                        var onMove = function onMove(e) {
                            augmentMouseEvent(e);
                            _this2.props.onTouchMove && _this2.props.onTouchMove(e);
                        };
                        var onUp = function onUp(e) {
                            doc.removeEventListener('mousemove', onMove);
                            doc.removeEventListener('mouseup', onUp);
                            augmentMouseEvent(e);
                            _this2.props.onTouchEnd && _this2.props.onTouchEnd(e);
                        };
                        doc.addEventListener('mousemove', onMove, false);
                        doc.addEventListener('mouseup', onUp, false);

                        // Need to .persist() a React event object before adding
                        // properties to it since it's reused otherwise.
                        e.persist();
                        augmentMouseEvent(e);
                        _this2.props.onTouchStart && _this2.props.onTouchStart(e);
                    },
                    ref: function ref(node) {
                        return _this2._div = node;
                    },
                    'aria-label': this.props.ariaLabel,
                    role: this.props.role
                },
                this.props.children
            );
        }
    }]);

    return View;
}(React.Component);

View.propTypes = {
    ariaLabel: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    // The `dynamicStyle` prop is provided for animating dynamic
    // properties, as creating Aphrodite StyleSheets in animation loops is
    // expensive. `dynamicStyle` should be a raw style object, rather than
    // a StyleSheet.
    dynamicStyle: PropTypes.any,
    // The `extraClassName` prop should almost never be used. It gives the
    // client a way to provide an additional CSS class name, to augment
    // the class name generated by Aphrodite. (Right now, it's only used to
    // disable some externally-applied CSS that would otherwise be far too
    // difficult to override with inline styles.)
    extraClassName: PropTypes.string,
    numberOfLines: PropTypes.number,
    onClick: PropTypes.func,
    onTouchCancel: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchStart: PropTypes.func,
    role: PropTypes.string,
    style: PropTypes.any
};
View.styles = StyleSheet.create({
    // From: https://github.com/necolas/react-native-web/blob/master/src/components/View/index.js
    initial: {
        alignItems: 'stretch',
        borderWidth: 0,
        borderStyle: 'solid',
        boxSizing: 'border-box',
        display: 'flex',
        flexBasis: 'auto',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        position: 'relative',
        // button and anchor reset
        backgroundColor: 'transparent',
        color: 'inherit',
        font: 'inherit',
        textAlign: 'inherit',
        textDecorationLine: 'none',
        // list reset
        listStyle: 'none',
        // fix flexbox bugs
        maxWidth: '100%',
        minHeight: 0,
        minWidth: 0
    }
});


module.exports = View;