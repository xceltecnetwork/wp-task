"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation, options, context) {
  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always-last-in-chain"]
    }, {
      actual: options,
      possible: {
        disableFix: _lodash.isBoolean
      },
      optional: true
    });

    if (!validOptions) {
      return;
    }

    (0, _atIfClosingBraceNewlineAfter.sassConditionalBraceNLAfterChecker)({
      root: root,
      result: result,
      ruleName: ruleName,
      atRuleName: "else",
      expectation: expectation,
      messages: messages,
      context: context,
      options: options
    });
  };
};

var _utils = require("../../utils");

var _stylelint = require("stylelint");

var _lodash = require("lodash");

var _atIfClosingBraceNewlineAfter = require("../at-if-closing-brace-newline-after");

var ruleName = exports.ruleName = (0, _utils.namespace)("at-else-closing-brace-newline-after");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: 'Expected newline after "}" of @else statement',
  rejected: 'Unexpected newline after "}" of @else statement'
});