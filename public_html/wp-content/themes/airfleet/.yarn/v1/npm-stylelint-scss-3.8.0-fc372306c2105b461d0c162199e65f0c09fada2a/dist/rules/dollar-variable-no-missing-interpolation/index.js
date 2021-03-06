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

    var stringVars = [];
    var vars = [];

    function findVars(node) {
      node.walkDecls(function (decl) {
        var prop = decl.prop,
            value = decl.value;


        if (!isSassVar(prop) || (0, _lodash.includes)(vars, prop)) {
          return;
        }

        if (isStringVal(value)) {
          stringVars.push(prop);
        }

        vars.push(prop);
      });
    }

    findVars(root);
    root.walkRules(findVars);

    if (!vars.length) {
      return;
    }

    function shouldReport(node, value) {
      if (isAtSupports(node) || isCustomIdentProp(node)) {
        return (0, _lodash.includes)(stringVars, value);
      }

      if (isCustomIdentAtRule(node)) {
        return (0, _lodash.includes)(vars, value);
      }

      return false;
    }

    function report(node, value) {
      var name = node.name,
          prop = node.prop,
          type = node.type;

      var nodeName = isAtRule(type) ? "@" + name : prop;

      _stylelint.utils.report({
        ruleName: ruleName,
        result: result,
        node: node,
        message: messages.rejected(nodeName, value)
      });
    }

    function exitEarly(node) {
      return node.type !== "word" || !node.value;
    }

    function walkValues(node, value) {
      (0, _postcssValueParser2.default)(value).walk(function (valNode) {
        var value = valNode.value;


        if (exitEarly(valNode) || !shouldReport(node, value)) {
          return;
        }

        report(node, value);
      });
    }

    root.walkDecls(toRegex(customIdentProps), function (decl) {
      walkValues(decl, decl.value);
    });

    root.walkAtRules(toRegex(customIdentAtRules), function (atRule) {
      walkValues(atRule, atRule.params);
    });
  };
};

var _lodash = require("lodash");

var _stylelint = require("stylelint");

var _utils = require("../../utils");

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = (0, _utils.namespace)("dollar-variable-no-missing-interpolation");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: function rejected(n, v) {
    return "Expected variable " + v + " to be interpolated when using it with " + n;
  }
});

// https://developer.mozilla.org/en/docs/Web/CSS/custom-ident#Lists_of_excluded_values
var customIdentProps = ["animation", "animation-name", "counter-reset", "counter-increment", "list-style-type", "will-change"];

// https://developer.mozilla.org/en/docs/Web/CSS/At-rule
var customIdentAtRules = ["counter-style", "keyframes", "supports"];

function isAtRule(type) {
  return type === "atrule";
}

function isCustomIdentAtRule(node) {
  return isAtRule(node.type) && (0, _lodash.includes)(customIdentAtRules, node.name);
}

function isCustomIdentProp(node) {
  return (0, _lodash.includes)(customIdentProps, node.prop);
}

function isAtSupports(node) {
  return isAtRule(node.type) && node.name === "supports";
}

function isSassVar(value) {
  return value[0] === "$";
}

function isStringVal(value) {
  return (/^("|').*("|')$/.test(value)
  );
}

function toRegex(arr) {
  return new RegExp("(" + arr.join("|") + ")");
}