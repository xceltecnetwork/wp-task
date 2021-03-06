"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (actual) {
  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, { actual: actual });

    if (!validOptions) {
      return;
    }

    root.walkAtRules("extend", function (atrule) {
      var isPlaceholder = atrule.params.trim()[0] === "%";
      var isInterpolation = /^#{.+}/.test(atrule.params.trim());

      if (!isPlaceholder && !isInterpolation) {
        _stylelint.utils.report({
          ruleName: ruleName,
          result: result,
          node: atrule,
          message: messages.rejected
        });
      }
    });
  };
};

var _stylelint = require("stylelint");

var _utils = require("../../utils");

var ruleName = exports.ruleName = (0, _utils.namespace)("at-extend-no-missing-placeholder");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: "Expected a placeholder selector (e.g. %placeholder) to be used in @extend"
});