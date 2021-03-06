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

    root.walkRules(/&/, function (rule) {
      (0, _utils.parseSelector)(rule.selector, result, rule, function (fullSelector) {
        // "Ampersand followed by a combinator followed by non-combinator non-ampersand and not the selector end"
        fullSelector.walkNesting(function (node) {
          var prev = node.prev();

          if (prev) {
            return;
          }

          var next = node.next();

          if (!next && node.parent.parent.nodes.length > 1) {
            return;
          }

          if (next && next.type !== "combinator") {
            return;
          }

          var nextNext = next ? next.next() : null;

          if (nextNext && (nextNext.type === "combinator" || nextNext.type === "nesting")) {
            return;
          }

          _stylelint.utils.report({
            ruleName: ruleName,
            result: result,
            node: rule,
            message: messages.rejected,
            index: node.sourceIndex
          });
        });
      });
    });
  };
};

var _stylelint = require("stylelint");

var _utils = require("../../utils");

var ruleName = exports.ruleName = (0, _utils.namespace)("selector-no-redundant-nesting-selector");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: "Unnecessary nesting selector (&)"
});