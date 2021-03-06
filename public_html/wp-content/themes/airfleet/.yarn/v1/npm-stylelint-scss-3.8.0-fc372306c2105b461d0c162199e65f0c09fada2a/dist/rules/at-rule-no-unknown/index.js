"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (primaryOption, secondaryOptions) {
  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: primaryOption
    }, {
      actual: secondaryOptions,
      possible: {
        ignoreAtRules: [_lodash.isRegExp, _lodash.isString]
      },
      optional: true
    });

    if (!validOptions) {
      return;
    }

    var optionsAtRules = secondaryOptions && secondaryOptions.ignoreAtRules;
    var ignoreAtRules = sassAtRules.concat(optionsAtRules || []);
    var defaultedOptions = Object.assign({}, secondaryOptions, {
      ignoreAtRules: ignoreAtRules
    });

    _stylelint.utils.checkAgainstRule({
      ruleName: ruleToCheckAgainst,
      ruleSettings: [primaryOption, defaultedOptions],
      root: root
    }, function (warning) {
      root.walkAtRules(function (atRule) {
        var name = atRule.name;

        if (ignoreAtRules.indexOf(name) < 0) {
          _stylelint.utils.report({
            message: messages.rejected("@" + name),
            ruleName: ruleName,
            result: result,
            node: warning.node,
            line: warning.line,
            column: warning.column
          });
        }
      });
    });
  };
};

var _lodash = require("lodash");

var _stylelint = require("stylelint");

var _utils = require("../../utils");

var sassAtRules = ["at-root", "content", "debug", "each", "else", "else if", "error", "extend", "for", "function", "if", "import", "include", "media", "mixin", "return", "warn", "while"];

var ruleToCheckAgainst = "at-rule-no-unknown";

var ruleName = exports.ruleName = (0, _utils.namespace)(ruleToCheckAgainst);

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: _stylelint.rules[ruleToCheckAgainst].messages.rejected
});