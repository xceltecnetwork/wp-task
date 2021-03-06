"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (statement) {
  if (!(0, _hasBlock2.default)(statement)) {
    return;
  }

  return (0, _rawNodeString2.default)(statement).slice((0, _beforeBlockString2.default)(statement).length);
};

var _beforeBlockString = require("./beforeBlockString");

var _beforeBlockString2 = _interopRequireDefault(_beforeBlockString);

var _hasBlock = require("./hasBlock");

var _hasBlock2 = _interopRequireDefault(_hasBlock);

var _rawNodeString = require("./rawNodeString");

var _rawNodeString2 = _interopRequireDefault(_rawNodeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }