"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation, _, context) {
  var checker = (0, _utils.whitespaceChecker)("space", expectation, messages);

  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never"]
    });

    if (!validOptions) {
      return;
    }

    (0, _dollarVariableColonSpaceAfter.variableColonSpaceChecker)({
      root: root,
      result: result,
      locationChecker: checker.before,
      checkedRuleName: ruleName,
      position: "before",
      expectation: expectation,
      context: context
    });
  };
};

var _utils = require("../../utils");

var _stylelint = require("stylelint");

var _dollarVariableColonSpaceAfter = require("../dollar-variable-colon-space-after");

var ruleName = exports.ruleName = (0, _utils.namespace)("dollar-variable-colon-space-before");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expectedBefore: function expectedBefore() {
    return 'Expected single space before ":"';
  },
  rejectedBefore: function rejectedBefore() {
    return 'Unexpected whitespace before ":"';
  }
});