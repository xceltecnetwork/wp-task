"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation, options) {
  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: expectation,
      possible: ["always", "never"]
    }, {
      actual: options,
      possible: {
        ignore: ["stylelint-commands"]
      },
      optional: true
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

        // Optionally ignore stylelint commands
        if (comment.text.indexOf(stylelintCommandPrefix) === 0 && (0, _utils.optionsHaveIgnored)(options, "stylelint-commands")) {
          return;
        }

        var isInline = comment.inlineAfter || comment.inlineBefore;
        var message = void 0;

        if (isInline && expectation === "never") {
          message = messages.rejected;
        } else if (!isInline && expectation === "always") {
          message = messages.expected;
        } else {
          return;
        }

        _stylelint.utils.report({
          message: message,
          node: root,
          index: comment.source.start,
          result: result,
          ruleName: ruleName
        });
      });
    }
  };
};

var _utils = require("../../utils");

var _stylelint = require("stylelint");

var ruleName = exports.ruleName = (0, _utils.namespace)("double-slash-comment-inline");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: "Expected //-comment to be inline comment",
  rejected: "Unexpected inline //-comment"
});

var stylelintCommandPrefix = "stylelint-";