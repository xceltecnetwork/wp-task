"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation, _, context) {
  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["never"]
    });

    if (!validOptions) {
      return;
    }

    root.walkAtRules(function (atrule) {
      if (atrule.name !== "else") {
        return;
      }

      // Don't need to ignore "the first rule in a stylesheet", etc, cases
      // because @else should always go after @if

      if (!(0, _utils.hasEmptyLine)(atrule.raws.before)) {
        return;
      }

      if (context.fix) {
        atrule.raws.before = " ";

        return;
      }

      _stylelint.utils.report({
        message: messages.rejected,
        node: atrule,
        result: result,
        ruleName: ruleName
      });
    });
  };
};

var _utils = require("../../utils");

var _stylelint = require("stylelint");

var ruleName = exports.ruleName = (0, _utils.namespace)("at-else-empty-line-before");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: "Unxpected empty line before @else"
});