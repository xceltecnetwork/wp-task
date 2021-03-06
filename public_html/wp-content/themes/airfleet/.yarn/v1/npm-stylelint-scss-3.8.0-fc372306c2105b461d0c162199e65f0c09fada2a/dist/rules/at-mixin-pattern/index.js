"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (pattern) {
  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: pattern,
      possible: [_lodash.isRegExp, _lodash.isString]
    });

    if (!validOptions) {
      return;
    }

    var regexpPattern = (0, _lodash.isString)(pattern) ? new RegExp(pattern) : pattern;

    root.walkAtRules(function (decl) {
      if (decl.name !== "mixin") {
        return;
      }

      // Stripping the mixin of its arguments
      var mixinName = decl.params.replace(/(\s*?)\((?:\s|\S)*\)/g, "");

      if (regexpPattern.test(mixinName)) {
        return;
      }

      _stylelint.utils.report({
        message: messages.expected,
        node: decl,
        result: result,
        ruleName: ruleName
      });
    });
  };
};

var _lodash = require("lodash");

var _stylelint = require("stylelint");

var _utils = require("../../utils");

var ruleName = exports.ruleName = (0, _utils.namespace)("at-mixin-pattern");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: "Expected @mixin name to match specified pattern"
});