"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (pattern, options) {
  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: pattern,
      possible: [_lodash.isRegExp, _lodash.isString]
    }, {
      actual: options,
      possible: {
        ignore: ["local", "global"]
      },
      optional: true
    });

    if (!validOptions) {
      return;
    }

    var regexpPattern = (0, _lodash.isString)(pattern) ? new RegExp(pattern) : pattern;

    root.walkDecls(function (decl) {
      var prop = decl.prop;


      if (prop[0] !== "$") {
        return;
      }

      // If local or global variables need to be ignored
      if ((0, _utils.optionsHaveIgnored)(options, "global") && decl.parent.type === "root" || (0, _utils.optionsHaveIgnored)(options, "local") && decl.parent.type !== "root") {
        return;
      }

      if (regexpPattern.test(prop.slice(1))) {
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

var ruleName = exports.ruleName = (0, _utils.namespace)("dollar-variable-pattern");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: "Expected $ variable name to match specified pattern"
});