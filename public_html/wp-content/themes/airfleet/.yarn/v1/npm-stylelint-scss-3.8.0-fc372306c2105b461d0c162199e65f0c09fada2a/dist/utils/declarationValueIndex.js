"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (decl) {
  var beforeColon = decl.toString().indexOf(":");
  var afterColon = decl.raw("between").length - decl.raw("between").indexOf(":");

  return beforeColon + afterColon;
};