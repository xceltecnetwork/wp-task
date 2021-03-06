"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation, _, context) {
  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always-intermediate", "never-intermediate"]
    });

    if (!validOptions) {
      return;
    }

    (0, _atIfClosingBraceSpaceAfter.sassConditionalBraceSpaceAfterChecker)({
      root: root,
      result: result,
      ruleName: ruleName,
      atRuleName: "else",
      expectation: expectation,
      messages: messages,
      context: context
    });
  };
};

var _utils = require("../../utils");

var _stylelint = require("stylelint");

var _atIfClosingBraceSpaceAfter = require("../at-if-closing-brace-space-after");

var ruleName = exports.ruleName = (0, _utils.namespace)("at-else-closing-brace-space-after");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: 'Expected single space after "}" of @else statement',
  rejected: 'Unexpected space after "}" of @else statement'
});