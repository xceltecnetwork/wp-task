"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (statement) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      noRawBefore = _ref.noRawBefore;

  var result = "";

  if (statement.type !== "rule" && statement.type !== "atrule") {
    return result;
  }

  if (!noRawBefore) {
    result += statement.raws.before;
  }

  if (statement.type === "rule") {
    result += statement.selector;
  } else {
    result += "@" + statement.name + statement.raws.afterName + statement.params;
  }

  var between = statement.raws.between;

  if (between !== undefined) {
    result += between;
  }

  return result;
};