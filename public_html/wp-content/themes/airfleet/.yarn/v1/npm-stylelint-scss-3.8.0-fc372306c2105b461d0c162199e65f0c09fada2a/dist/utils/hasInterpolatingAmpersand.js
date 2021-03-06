"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (selector) {
  for (var i = 0; i < selector.length; i++) {
    if (selector[i] !== "&") {
      continue;
    }

    if (!_lodash2.default.isUndefined(selector[i - 1]) && !isCombinator(selector[i - 1])) {
      return true;
    }

    if (!_lodash2.default.isUndefined(selector[i + 1]) && !isCombinator(selector[i + 1])) {
      return true;
    }
  }

  return false;
};

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isCombinator(x) {
  return (/[\s+>~]/.test(x)
  );
}

/**
 * Check whether a selector has an interpolating ampersand
 * An "interpolating ampersand" is an "&" used to interpolate within another
 * simple selector (e.g. `&-modifier`), rather than an "&" that stands
 * on its own as a simple selector (e.g. `& .child`)
 *
 * @param {string} selector
 * @return {boolean} If `true`, the selector has an interpolating ampersand
 */