"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _KeyConfigs;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This file contains configuration settings for the buttons in the keypad.
 */

/* globals i18n */

var Keys = require("../data/keys");

var _require = require("../consts"),
    DecimalSeparators = _require.DecimalSeparators,
    IconTypes = _require.IconTypes,
    KeyTypes = _require.KeyTypes;

var _require2 = require("../utils"),
    decimalSeparator = _require2.decimalSeparator;

var i18n = require("../lib/i18n");

var KeyConfigs = (_KeyConfigs = {}, _defineProperty(_KeyConfigs, Keys.PLUS, {
  type: KeyTypes.OPERATOR,
  // I18N: A label for a plus sign.
  ariaLabel: i18n._("Plus")
}), _defineProperty(_KeyConfigs, Keys.MINUS, {
  type: KeyTypes.OPERATOR,
  // I18N: A label for a minus sign.
  ariaLabel: i18n._("Minus")
}), _defineProperty(_KeyConfigs, Keys.NEGATIVE, {
  type: KeyTypes.VALUE,
  // I18N: A label for a minus sign.
  ariaLabel: i18n._("Negative")
}), _defineProperty(_KeyConfigs, Keys.TIMES, {
  type: KeyTypes.OPERATOR,
  // I18N: A label for a multiplication sign (represented with an 'x').
  ariaLabel: i18n._("Multiply")
}), _defineProperty(_KeyConfigs, Keys.DIVIDE, {
  type: KeyTypes.OPERATOR,
  // I18N: A label for a division sign.
  ariaLabel: i18n._("Divide")
}), _defineProperty(_KeyConfigs, Keys.DECIMAL, {
  type: KeyTypes.VALUE,
  // I18N: A label for a decimal symbol.
  ariaLabel: i18n._("Decimal"),
  icon: decimalSeparator === DecimalSeparators.COMMA ? {
    // TODO(charlie): Get an SVG icon for the comma, or verify with
    // design that the text-rendered version is acceptable.
    type: IconTypes.TEXT,
    data: ","
  } : {
    type: IconTypes.SVG,
    data: Keys.PERIOD
  }
}), _defineProperty(_KeyConfigs, Keys.PERCENT, {
  type: KeyTypes.OPERATOR,
  // I18N: A label for a percent sign.
  ariaLabel: i18n._("Percent")
}), _defineProperty(_KeyConfigs, Keys.CDOT, {
  type: KeyTypes.OPERATOR,
  // I18N: A label for a multiplication sign (represented as a dot).
  ariaLabel: i18n._("Multiply")
}), _defineProperty(_KeyConfigs, Keys.EQUAL, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Equals sign")
}), _defineProperty(_KeyConfigs, Keys.NEQ, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Not-equals sign")
}), _defineProperty(_KeyConfigs, Keys.GT, {
  type: KeyTypes.OPERATOR,
  // I18N: A label for a 'greater than' sign (represented as '>').
  ariaLabel: i18n._("Greater than sign")
}), _defineProperty(_KeyConfigs, Keys.LT, {
  type: KeyTypes.OPERATOR,
  // I18N: A label for a 'less than' sign (represented as '<').
  ariaLabel: i18n._("Less than sign")
}), _defineProperty(_KeyConfigs, Keys.GEQ, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Greater than or equal to sign")
}), _defineProperty(_KeyConfigs, Keys.LEQ, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Less than or equal to sign")
}), _defineProperty(_KeyConfigs, Keys.FRAC_INCLUSIVE, {
  type: KeyTypes.OPERATOR,
  // I18N: A label for a button that creates a new fraction and puts the
  // current expression in the numerator of that fraction.
  ariaLabel: i18n._("Fraction, with current expression in numerator")
}), _defineProperty(_KeyConfigs, Keys.FRAC_EXCLUSIVE, {
  type: KeyTypes.OPERATOR,
  // I18N: A label for a button that creates a new fraction next to the
  // cursor.
  ariaLabel: i18n._("Fraction, excluding the current expression")
}), _defineProperty(_KeyConfigs, Keys.EXP, {
  type: KeyTypes.OPERATOR,
  // I18N: A label for a button that will allow the user to input a custom
  // exponent.
  ariaLabel: i18n._("Custom exponent")
}), _defineProperty(_KeyConfigs, Keys.EXP_2, {
  type: KeyTypes.OPERATOR,
  // I18N: A label for a button that will square (take to the second
  // power) some math.
  ariaLabel: i18n._("Square")
}), _defineProperty(_KeyConfigs, Keys.EXP_3, {
  type: KeyTypes.OPERATOR,
  // I18N: A label for a button that will cube (take to the third power)
  // some math.
  ariaLabel: i18n._("Cube")
}), _defineProperty(_KeyConfigs, Keys.SQRT, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Square root")
}), _defineProperty(_KeyConfigs, Keys.CUBE_ROOT, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Cube root")
}), _defineProperty(_KeyConfigs, Keys.RADICAL, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Radical with custom root")
}), _defineProperty(_KeyConfigs, Keys.LEFT_PAREN, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Left parenthesis")
}), _defineProperty(_KeyConfigs, Keys.RIGHT_PAREN, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Right parenthesis")
}), _defineProperty(_KeyConfigs, Keys.LN, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Natural logarithm")
}), _defineProperty(_KeyConfigs, Keys.LOG, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Logarithm with base 10")
}), _defineProperty(_KeyConfigs, Keys.LOG_N, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Logarithm with custom base")
}), _defineProperty(_KeyConfigs, Keys.SIN, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Sine")
}), _defineProperty(_KeyConfigs, Keys.COS, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Cosine")
}), _defineProperty(_KeyConfigs, Keys.TAN, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Tangent")
}), _defineProperty(_KeyConfigs, Keys.PI, {
  type: KeyTypes.VALUE,
  ariaLabel: i18n._("Pi"),
  icon: {
    type: IconTypes.MATH,
    data: "\\pi"
  }
}), _defineProperty(_KeyConfigs, Keys.THETA, {
  type: KeyTypes.VALUE,
  ariaLabel: i18n._("Theta"),
  icon: {
    type: IconTypes.MATH,
    data: "\\theta"
  }
}), _defineProperty(_KeyConfigs, Keys.NOOP, {
  type: KeyTypes.EMPTY
}), _defineProperty(_KeyConfigs, Keys.UP, {
  type: KeyTypes.INPUT_NAVIGATION,
  ariaLabel: i18n._("Up arrow")
}), _defineProperty(_KeyConfigs, Keys.RIGHT, {
  type: KeyTypes.INPUT_NAVIGATION,
  ariaLabel: i18n._("Right arrow")
}), _defineProperty(_KeyConfigs, Keys.DOWN, {
  type: KeyTypes.INPUT_NAVIGATION,
  ariaLabel: i18n._("Down arrow")
}), _defineProperty(_KeyConfigs, Keys.LEFT, {
  type: KeyTypes.INPUT_NAVIGATION,
  ariaLabel: i18n._("Left arrow")
}), _defineProperty(_KeyConfigs, Keys.JUMP_OUT_PARENTHESES, {
  type: KeyTypes.INPUT_NAVIGATION,
  ariaLabel: i18n._("Navigate right out of a set of parentheses")
}), _defineProperty(_KeyConfigs, Keys.JUMP_OUT_EXPONENT, {
  type: KeyTypes.INPUT_NAVIGATION,
  ariaLabel: i18n._("Navigate right out of an exponent")
}), _defineProperty(_KeyConfigs, Keys.JUMP_OUT_BASE, {
  type: KeyTypes.INPUT_NAVIGATION,
  ariaLabel: i18n._("Navigate right out of a base")
}), _defineProperty(_KeyConfigs, Keys.JUMP_INTO_NUMERATOR, {
  type: KeyTypes.INPUT_NAVIGATION,
  ariaLabel: i18n._("Navigate right into the numerator of a fraction")
}), _defineProperty(_KeyConfigs, Keys.JUMP_OUT_NUMERATOR, {
  type: KeyTypes.INPUT_NAVIGATION,
  ariaLabel: i18n._("Navigate right out of the numerator and into the denominator")
}), _defineProperty(_KeyConfigs, Keys.JUMP_OUT_DENOMINATOR, {
  type: KeyTypes.INPUT_NAVIGATION,
  ariaLabel: i18n._("Navigate right out of the denominator of a fraction")
}), _defineProperty(_KeyConfigs, Keys.BACKSPACE, {
  type: KeyTypes.INPUT_NAVIGATION,
  // I18N: A label for a button that will delete some input.
  ariaLabel: i18n._("Delete")
}), _defineProperty(_KeyConfigs, Keys.DISMISS, {
  type: KeyTypes.KEYPAD_NAVIGATION,
  // I18N: A label for a button that will dismiss/hide a keypad.
  ariaLabel: i18n._("Dismiss")
}), _defineProperty(_KeyConfigs, Keys.SUPSUB, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Superscrito + subscrito")
}), _defineProperty(_KeyConfigs, Keys.SUB, {
  type: KeyTypes.OPERATOR,
  ariaLabel: i18n._("Subscrito")
}), _KeyConfigs);

// Add in any multi-function buttons. By default, these keys will mix in any
// configuration settings from their default child key (i.e., the first key in
// the `childKeyIds` array).
// TODO(charlie): Make the multi-function button's long-press interaction
// accessible.
KeyConfigs[Keys.FRAC_MULTI] = {
  childKeyIds: [Keys.FRAC_INCLUSIVE, Keys.FRAC_EXCLUSIVE]
};

// TODO(charlie): Use the numeral color for the 'Many' key.
KeyConfigs[Keys.MANY] = {
  type: KeyTypes.MANY
  // childKeyIds will be configured by the client.
};

// Add in every numeral.
var NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = NUMBERS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var num = _step.value;

    // TODO(charlie): Consider removing the SVG icons that we have for the
    // numeral keys. They can be rendered just as easily with text (though that
    // would mean that we'd be using text beyond the variable key).
    var textRepresentation = "" + num;
    KeyConfigs["NUM_" + num] = {
      type: KeyTypes.VALUE,
      ariaLabel: textRepresentation,
      icon: {
        type: IconTypes.TEXT,
        data: textRepresentation
      }
    };
  }

  // Add in every variable.
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

var LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = LETTERS[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var letter = _step2.value;

    var lowerCaseVariable = letter.toLowerCase();
    var upperCaseVariable = letter.toUpperCase();

    var _arr = [lowerCaseVariable, upperCaseVariable];
    for (var _i = 0; _i < _arr.length; _i++) {
      var _textRepresentation = _arr[_i];
      KeyConfigs[_textRepresentation] = {
        type: KeyTypes.VALUE,
        ariaLabel: _textRepresentation,
        icon: {
          type: IconTypes.MATH,
          data: _textRepresentation
        }
      };
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

var SPECIAL_CHARACTERS = ["β", "Γ", "Δ", "Ε", "δ", "η", "ϴ", "ι", "k", "Λ", "μ", "ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "υ", "Φ", "χ", "Ψ", "Ω", "α", "γ", "δ", "ε", "ζ", "θ", "λ", "ξ", "ο", "π", "ρ", "σ", "τ", "φ", "ψ", "ω", "ζ", "∀", "∁", "∂", "∃", "∄", "∅", "∆", "∇", "∈", "∉", "∴", "∋", "∌", "≦", "≧", "⋘", "⋙", "∑", "≠", "∓", "≡", "∕", "∖", "∘", "∙", "∪", "⊃", "⊄", "⊅", "∞", "≅", "∠", "⊂", "⋂", "⋃", "∩", "∫", "|", "←", "↑", "→", "↓", "↔", "↕", "↖", "↗", "↘", "↙", "↚", "↛", "↜", "↝", "⇦", "⇧", "⇨", "⇩", "↢", "↣", "⇄", "⇅", "⇆", "⇇", "⇈", "⇉", "⇊", "⇋", "⇿", "↯", "↰", "↱", "↲", "↳", "↴", "↵", "↶", "↷", "⊕", "⊙", "⊗", "∵", "±"];
var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = SPECIAL_CHARACTERS[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var sc = _step3.value;

    KeyConfigs[sc] = {
      type: KeyTypes.VALUE,
      ariaLabel: sc,
      icon: {
        type: IconTypes.TEXT,
        data: sc
      }
    };
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3.return) {
      _iterator3.return();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
  for (var _iterator4 = Object.keys(KeyConfigs)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
    var key = _step4.value;

    KeyConfigs[key] = _extends({
      id: key,
      // Default to an SVG icon indexed by the key name.
      icon: {
        type: IconTypes.SVG,
        data: key
      }
    }, KeyConfigs[key]);
  }
} catch (err) {
  _didIteratorError4 = true;
  _iteratorError4 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion4 && _iterator4.return) {
      _iterator4.return();
    }
  } finally {
    if (_didIteratorError4) {
      throw _iteratorError4;
    }
  }
}

module.exports = KeyConfigs;