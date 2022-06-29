"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

const bandSchema = [(0, _expressValidator.check)('about').trim().isLength({
  min: 1
}).withMessage('შეიყვანეთ ვენდის შესახებ ინფორმაცია')];
var _default = bandSchema;
exports.default = _default;