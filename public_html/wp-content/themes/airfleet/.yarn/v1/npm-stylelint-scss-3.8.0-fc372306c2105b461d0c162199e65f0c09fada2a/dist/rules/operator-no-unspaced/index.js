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

    (0, _utils.eachRoot)(root, checkRoot);

    function checkRoot(root) {
      var rootString = root.source.input.css;

      if (rootString.trim() === "") {
        return;
      }

      calculationOperatorSpaceChecker({
        root: root,
        result: result,
        checker: checkSpaces
      });
    }
  };
};

exports.calculationOperatorSpaceChecker = calculationOperatorSpaceChecker;

var _stylelint = require("stylelint");

var _utils = require("../../utils");

var _postcssMediaQueryParser = require("postcss-media-query-parser");

var _postcssMediaQueryParser2 = _interopRequireDefault(_postcssMediaQueryParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = (0, _utils.namespace)("operator-no-unspaced");

var messages = exports.messages = _stylelint.utils.ruleMessages(ruleName, {
  expectedAfter: function expectedAfter(operator) {
    return "Expected single space after \"" + operator + "\"";
  },
  expectedBefore: function expectedBefore(operator) {
    return "Expected single space before \"" + operator + "\"";
  }
});

/**
 * The actual check for are there (un)necessary whitespaces
 */
function checkSpaces(_ref) {
  var string = _ref.string,
      globalIndex = _ref.globalIndex,
      startIndex = _ref.startIndex,
      endIndex = _ref.endIndex,
      node = _ref.node,
      result = _ref.result;

  var symbol = string.substring(startIndex, endIndex + 1);

  var beforeOk = string[startIndex - 1] === " " && !(0, _utils.isWhitespace)(string[startIndex - 2]) || newlineBefore(string, startIndex - 1);

  if (!beforeOk) {
    _stylelint.utils.report({
      ruleName: ruleName,
      result: result,
      node: node,
      message: messages.expectedBefore(symbol),
      index: startIndex + globalIndex
    });
  }

  var afterOk = string[endIndex + 1] === " " && !(0, _utils.isWhitespace)(string[endIndex + 2]) || string[endIndex + 1] === "\n" || string.substr(endIndex + 1, 2) === "\r\n";

  if (!afterOk) {
    _stylelint.utils.report({
      ruleName: ruleName,
      result: result,
      node: node,
      message: messages.expectedAfter(symbol),
      index: endIndex + globalIndex
    });
  }
}

function newlineBefore(str, startIndex) {
  var index = startIndex;

  while (index && (0, _utils.isWhitespace)(str[index])) {
    if (str[index] === "\n") return true;

    index--;
  }

  return false;
}

/**
 * The core rule logic function. This one can be imported by some other rules
 * that work with Sass operators
 *
 * @param {Object} args -- Named arguments object
 * @param {PostCSS Root} args.root
 * @param {PostCSS Result} args.result
 * @param {function} args.checker -- the function that is run against all the
 *    operators found in the input. Takes these arguments:
 *    {Object} cbArgs -- Named arguments object
 *    {string} cbArgs.string -- the input string (suspected operation)
 *    {number} cbArgs.globalIndex -- the string's index in a global input
 *    {number} cbArgs.startIndex -- the start index of a sybmol to inspect
 *    {number} cbArgs.endIndex -- the end index of a sybmol to inspect
 *      (two indexes needed to allow for `==`, `!=`, etc.)
 *    {PostCSS Node} cbArgs.node -- for stylelint.utils.report
 *    {PostCSS Result} cbArgs.result -- for stylelint.utils.report
 */
function calculationOperatorSpaceChecker(_ref2) {
  var root = _ref2.root,
      result = _ref2.result,
      checker = _ref2.checker;

  /**
   * Takes a string, finds all occurencies of Sass interpolaion in it, then
   * finds all operators inside that interpolation
   *
   * @return {array} An array of ojbects { string, operators } - effectively,
   *    a list of operators for each Sass interpolation occurence
   */
  function findInterpolation(string, startIndex) {
    var interpolationRegex = /#{(.*?)}/g;
    var results = [];
    // Searching for interpolation
    var match = interpolationRegex.exec(string);

    startIndex = !isNaN(startIndex) ? Number(startIndex) : 0;
    while (match !== null) {
      results.push({
        source: match[0],
        operators: (0, _utils.findOperators)({
          string: match[0],
          globalIndex: match.index + startIndex
        })
      });
      match = interpolationRegex.exec(string);
    }

    return results;
  }

  root.walk(function (item) {
    if (item.prop === "unicode-range") {
      return;
    }

    var results = [];

    // Check a value (`10px` in `width: 10px;`)
    if (item.value !== undefined) {
      results.push({
        source: item.value,
        operators: (0, _utils.findOperators)({
          string: item.value,
          globalIndex: (0, _utils.declarationValueIndex)(item),
          // For Sass variable values some special rules apply
          isAfterColon: item.prop[0] === "$"
        })
      });
    }

    // Property name
    if (item.prop !== undefined) {
      results = results.concat(findInterpolation(item.prop));
    }

    // Selector
    if (item.selector !== undefined) {
      results = results.concat(findInterpolation(item.selector));
    }

    if (item.type === "atrule") {
      // Media queries
      if (item.name === "media" || item.name === "import") {
        (0, _postcssMediaQueryParser2.default)(item.params).walk(function (node) {
          var type = node.type;

          if (["keyword", "media-type", "media-feature"].indexOf(type) !== -1) {
            results = results.concat(findInterpolation(node.value, (0, _utils.atRuleParamIndex)(item) + node.sourceIndex));
          } else if (["value", "url"].indexOf(type) !== -1) {
            results.push({
              source: node.value,
              operators: (0, _utils.findOperators)({
                string: node.value,
                globalIndex: (0, _utils.atRuleParamIndex)(item) + node.sourceIndex,
                isAfterColon: true
              })
            });
          }
        });
      } else {
        // Function and mixin definitions and other rules
        results.push({
          source: item.params,
          operators: (0, _utils.findOperators)({
            string: item.params,
            globalIndex: (0, _utils.atRuleParamIndex)(item),
            isAfterColon: true
          })
        });
      }
    }

    // All the strings have been parsed, now run whitespace checking
    results.forEach(function (el) {
      // Only if there are operators within a string
      if (el.operators && el.operators.length > 0) {
        el.operators.forEach(function (operator) {
          checker({
            string: el.source,
            globalIndex: operator.globalIndex,
            startIndex: operator.startIndex,
            endIndex: operator.endIndex,
            node: item,
            result: result
          });
        });
      }
    });
  });

  // Checking interpolation inside comments
  // We have to give up on PostCSS here because it skips some inline comments
  (0, _utils.findCommentsInRaws)(root.source.input.css).forEach(function (comment) {
    var startIndex = comment.source.start + comment.raws.startToken.length + comment.raws.left.length;

    if (comment.type !== "css") {
      return;
    }

    findInterpolation(comment.text).forEach(function (el) {
      // Only if there are operators within a string
      if (el.operators && el.operators.length > 0) {
        el.operators.forEach(function (operator) {
          checker({
            string: el.source,
            globalIndex: operator.globalIndex + startIndex,
            startIndex: operator.startIndex,
            endIndex: operator.endIndex,
            node: root,
            result: result
          });
        });
      }
    });
  });
}