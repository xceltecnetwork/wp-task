"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (node) {
  var result = "";

  if (node.raws.before) {
    result += node.raws.before;
  }

  result += node.toString();

  return result;
};