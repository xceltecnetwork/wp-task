"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation) {
  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never"]
    });

    if (!validOptions) {
      return;
    }

    var valueRegex = /:(?:\s*?)(\S.+?)(:?\s*?)\)/;
    // In `(max-width: 10px )` find `: 10px )`.
    // Got to go with that (the global search doesn't remember parens' insides)
    // and parse it again afterwards to remove trailing junk
    var valueRegexGlobal = new RegExp(valueRegex.source, "g");
    // `$var-name_sth`
    var variableRegex = /^\$[A-Za-z_0-9-]+$/;
    // `#{$var-name_sth}`
    var interpolationVarRegex = /^#\{\s*?\$[A-Za-z_0-9]+\s*?\}$/;

    root.walkAtRules("media", function (atRule) {
      var found = atRule.params.match(valueRegexGlobal);

      // If there are no values
      if (!found || !found.length) {
        return;
      }

      found.forEach(function (found) {
        // ... parse `: 10px )` to `10px`
        var valueParsed = found.match(valueRegex)[1];

        // Just a shorthand to stylelint.utils.report()
        function complain(message) {
          _stylelint.utils.report({
            ruleName: ruleName,
            result: result,
            node: atRule,
            word: valueParsed,
            message: message
          });
        }

        // A value should be a single variable
        // or it should be a single variable inside Sass interpolation
        if (expectation === "always" && !(valueParsed.search(variableRegex) !== -1 || valueParsed.search(interpolationVarRegex) !== -1)) {
          complain(messages.expected);
        } else if (expectation === "never" && valueParsed.indexOf("$") !== -1) {
          // "Never" means no variables at all (functions allowed)
          complain(messages.rejected);
        }
      });
    });
  };
};

var _stylelint = require("stylelint");

var _utils = require("../../utils");

var ruleName = exports.ruleName = (0, _utils.namespace)("media-feature-value-dollar-variable");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: "Unexpected dollar-variable as a media feature value",
  expected: "Expected a dollar-variable (e.g. $var) to be used as a media feature value"
});