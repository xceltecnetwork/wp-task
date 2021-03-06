"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation) {
  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: expectation
    });

    if (!validOptions) {
      return;
    }

    root.walk(function (item) {
      if (item.type !== "rule" && item.type !== "atrule") {
        return;
      }

      var nestedGroups = {};

      // Find all nested property groups
      item.each(function (decl) {
        if (decl.type !== "rule") {
          return;
        }

        var testForProp = (0, _utils.parseNestedPropRoot)(decl.selector);

        if (testForProp && testForProp.propName !== undefined) {
          var ns = testForProp.propName.value;

          if (!nestedGroups.hasOwnProperty(ns)) {
            nestedGroups[ns] = [];
          }

          nestedGroups[ns].push(decl);
        }
      });

      Object.keys(nestedGroups).forEach(function (namespace) {
        // Only warn if there are more than one nested groups with equal namespaces
        if (nestedGroups[namespace].length === 1) {
          return;
        }

        nestedGroups[namespace].forEach(function (group) {
          _stylelint.utils.report({
            message: messages.expected(namespace),
            node: group,
            result: result,
            ruleName: ruleName
          });
        });
      });
    });
  };
};

var _utils = require("../../utils");

var _stylelint = require("stylelint");

var ruleName = exports.ruleName = (0, _utils.namespace)("declaration-nested-properties-no-divided-groups");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: function expected(prop) {
    return "Expected all nested properties of \"" + prop + "\" namespace to be in one nested group";
  }
});