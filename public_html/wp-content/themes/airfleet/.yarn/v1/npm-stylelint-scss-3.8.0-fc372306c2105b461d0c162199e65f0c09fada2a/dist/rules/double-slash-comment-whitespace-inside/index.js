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

    (0, _utils.eachRoot)(root, checkRoot);

    function checkRoot(root) {
      var rootString = root.source.input.css;

      if (rootString.trim() === "") {
        return;
      }

      var comments = (0, _utils.findCommentsInRaws)(rootString);

      comments.forEach(function (comment) {
        // Only process // comments
        if (comment.type !== "double-slash") {
          return;
        }

        // if it's `//` - no warning whatsoever; if `// ` - then trailing
        // whitespace rule will govern this
        if (comment.text === "") {
          return;
        }

        var message = void 0;

        if (expectation === "never" && comment.raws.left !== "") {
          message = messages.rejected;
        } else if (comment.raws.left === "" && expectation === "always") {
          message = messages.expected;
        } else {
          return;
        }

        _stylelint.utils.report({
          message: message,
          node: root,
          index: comment.source.start + comment.raws.startToken.length,
          result: result,
          ruleName: ruleName
        });
      });
    }
  };
};

var _utils = require("../../utils");

var _stylelint = require("stylelint");

var ruleName = exports.ruleName = (0, _utils.namespace)("double-slash-comment-whitespace-inside");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: "Expected a space after //",
  rejected: "Unexpected space after //"
});