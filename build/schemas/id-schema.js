"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

const idSchema = [(0, _expressValidator.check)('id').trim().isLength({
  min: 24,
  max: 24
}).withMessage('id უნდა შეიცავდეს ზუსტად 24 სიმბოლოს')];
var _default = idSchema;
exports.default = _default;