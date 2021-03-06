"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (value, _, context) {
  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: value,
      possible: ["always", "never"]
    });

    if (!validOptions) {
      return;
    }

    root.walkAtRules("include", function (mixinCall) {
      // If it is "No parens in argumentless calls"
      if (value === "never" && mixinCall.params.search(/\(\s*?\)\s*?$/) === -1) {
        return;
      }

      // If it is "Always use parens"
      if (value === "always" && mixinCall.params.search(/\(/) !== -1) {
        return;
      }

      if (context.fix) {
        if (value === "always") {
          mixinCall.params = mixinCall.params + " ()";
        } else {
          mixinCall.params = mixinCall.params.replace(/\s*\([\s\S]*?\)$/, "");
        }

        return;
      }

      var mixinName = /\s*(\S*?)\s*(?:\(|$)/.exec(mixinCall.params)[1];

      _stylelint.utils.report({
        message: messages[value === "never" ? "rejected" : "expected"](mixinName),
        node: mixinCall,
        result: result,
        ruleName: ruleName
      });
    });
  };
};

var _stylelint = require("stylelint");

var _utils = require("../../utils");

var ruleName = exports.ruleName = (0, _utils.namespace)("at-mixin-argumentless-call-parentheses");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: function expected(mixin) {
    return "Expected parentheses in mixin \"" + mixin + "\" call";
  },
  rejected: function rejected(mixin) {
    return "Unexpected parentheses in argumentless mixin \"" + mixin + "\" call";
  }
});