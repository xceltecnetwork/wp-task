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

    var placeholderPattern = (0, _lodash.isString)(pattern) ? new RegExp(pattern) : pattern;

    // Checking placeholder definitions (looking among regular rules)
    root.walkRules(function (rule) {
      var selector = rule.selector;

      // Just a shorthand for calling `parseSelector`

      function parse(selector) {
        (0, _utils.parseSelector)(selector, result, rule, function (s) {
          return checkSelector(s, rule);
        });
      }

      // If it's a custom prop or a less mixin
      if (!(0, _utils.isStandardRule)(rule)) {
        return;
      }

      // If the selector has interpolation
      if (!(0, _utils.isStandardSelector)(selector)) {
        return;
      }

      // Nested selectors are processed in steps, as nesting levels are resolved.
      // Here we skip processing intermediate parts of selectors (to process only fully resolved selectors)
      // if (rule.nodes.some(node => node.type === "rule" || node.type === "atrule")) { return }

      // Only resolve selectors that have an interpolating "&"
      if ((0, _utils.hasInterpolatingAmpersand)(selector)) {
        (0, _postcssResolveNestedSelector2.default)(selector, rule).forEach(parse);
      } else {
        parse(selector);
      }
    });

    function checkSelector(fullSelector, rule) {
      // postcss-selector-parser gives %placeholders' nodes a "tag" type
      fullSelector.walkTags(function (compoundSelector) {
        var value = compoundSelector.value,
            sourceIndex = compoundSelector.sourceIndex;


        if (value[0] !== "%") {
          return;
        }

        var placeholder = value.slice(1);

        if (placeholderPattern.test(placeholder)) {
          return;
        }

        _stylelint.utils.report({
          result: result,
          ruleName: ruleName,
          message: messages.expected(placeholder),
          node: rule,
          index: sourceIndex
        });
      });
    }
  };
};

var _lodash = require("lodash");

var _postcssResolveNestedSelector = require("postcss-resolve-nested-selector");

var _postcssResolveNestedSelector2 = _interopRequireDefault(_postcssResolveNestedSelector);

var _stylelint = require("stylelint");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = (0, _utils.namespace)("percent-placeholder-pattern");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expected: function expected(placeholder) {
    return "Expected %-placeholder \"%" + placeholder + "\" to match specified pattern";
  }
});