'use strict';

/**
 * A single function used to scroll a DOM node into view, optionally taking into
 * account that it may be obscured by the custom keypad. The logic makes the
 * strong assumption that the keypad will be anchored to the bottom of the page
 * in calculating its height, as this method may be called before the keypad has
 * animated into view.
 *
 * TODO(charlie): Move this scroll logic out of our components and into a higher
 * level in the component tree--perhaps even into webapp, beyond Perseus.
 */

var _require = require('../common-style'),
    toolbarHeightPx = _require.toolbarHeightPx;

var scrollIntoView = function scrollIntoView(containerNode, keypadNode) {
    // TODO(charlie): There's no need for us to be reading the keypad bounds
    // here, since they're pre-determined by logic in the store. We should
    // instead pass around an object that knows the bounds.
    var containerBounds = containerNode.getBoundingClientRect();
    var containerBottomPx = containerBounds.bottom;
    var containerTopPx = containerBounds.top;

    var desiredMarginPx = 16;

    if (keypadNode) {
        // NOTE(charlie): We can't use the bounding rect of the keypad,
        // as it is likely in the process of animating in. Instead, to
        // calculate its top, we make the strong assumption that the
        // keypad will end up anchored at the bottom of the page, but above the
        // toolbar, and use its height, which is known at this point. Note that,
        // in the native apps (where the toolbar is rendered natively), this
        // will result in us leaving excess space between the input and the
        // keypad, but that seems okay.
        var pageHeightPx = window.innerHeight;
        var keypadHeightPx = keypadNode.clientHeight;
        var keypadTopPx = pageHeightPx - (keypadHeightPx + toolbarHeightPx);

        if (containerBottomPx > keypadTopPx) {
            // If the input would be obscured by the keypad, scroll such that
            // the bottom of the input is just above the top of the keypad,
            // taking care not to scroll the input out of view.
            var scrollOffset = Math.min(containerBottomPx - keypadTopPx + desiredMarginPx, containerTopPx);

            document.body.scrollTop += scrollOffset;
            return;
        }
    }

    // Alternatively, if the input is out of the viewport or nearly out
    // of the viewport, scroll it into view. We can do this regardless
    // of whether the keypad has been provided.
    if (containerTopPx < desiredMarginPx) {
        document.body.scrollTop -= containerBounds.height + desiredMarginPx;
    }
};

module.exports = scrollIntoView;