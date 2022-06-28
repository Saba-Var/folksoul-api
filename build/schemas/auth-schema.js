"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

const authSchema = [(0, _expressValidator.check)('username').isLength({
  min: 3
}).withMessage('Username must be at least 3 characters long').isLowercase().withMessage('Username should not contain upper case letters'), (0, _expressValidator.check)('password').notEmpty().withMessage('Password is required')];
var _default = authSchema;
exports.default = _default;