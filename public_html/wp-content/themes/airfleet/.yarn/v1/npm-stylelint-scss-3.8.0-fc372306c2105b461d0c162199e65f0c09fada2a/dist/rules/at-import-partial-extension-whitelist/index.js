"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (whitelistOption) {
  var whitelist = [].concat(whitelistOption);

  return function (root, result) {
    var validOptions = _stylelint.utils.validateOptions(result, ruleName, {
      actual: whitelistOption,
      possible: [_lodash.isString, _lodash.isRegExp]
    });

    if (!validOptions) {
      return;
    }

    function checkPathForUnderscore(path, decl) {
      // Stripping trailing quotes and whitespaces, if any
      var pathStripped = path.replace(/^\s*?("|')\s*/, "").replace(/\s*("|')\s*?$/, "");
      var extension = _path2.default.extname(pathStripped).slice(1);
      // Save this separately to be able to pass the original string to report()
      var extensionNormalized = extension.toLowerCase();

      // If the extension is empty
      if (!extension) {
        return;
      }

      // Skipping importing CSS: url(), ".css", URI with a protocol, media
      if (pathStripped.slice(0, 4) === "url(" || pathStripped.slice(-4) === ".css" || pathStripped.search("//") !== -1 || pathStripped.search(/(?:\s|[,)"'])\w+$/) !== -1) {
        return;
      }

      if (whitelist.some(function (ext) {
        return (0, _lodash.isString)(ext) && extensionNormalized === ext || (0, _lodash.isRegExp)(ext) && extensionNormalized.search(ext) !== -1;
      })) {
        return;
      }

      _stylelint.utils.report({
        message: messages.rejected(extension),
        node: decl,
        word: extension,
        result: result,
        ruleName: ruleName
      });
    }

    root.walkAtRules("import", function (atRule) {
      // Processing comma-separated lists of import paths
      atRule.params.split(",").forEach(function (path) {
        checkPathForUnderscore(path, atRule);
      });
    });
  };
};

var _lodash = require("lodash");

var _stylelint = require("stylelint");

var _utils = require("../../utils");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = (0, _utils.namespace)("at-import-partial-extension-whitelist");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  rejected: function rejected(ext) {
    return "Unexpected extension \"." + ext + "\" in imported partial name";
  }
});