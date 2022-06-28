"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

const memberDetailsSchema = [(0, _expressValidator.check)('name').trim().isLength({
  min: 3
}).withMessage('Name should be at least 3 characters long'), (0, _expressValidator.check)('instrument').exists().trim().isLength({
  min: 3
}).withMessage('Instrument should be at least 2 characters long'), (0, _expressValidator.check)('orbitLength').exists().trim().withMessage('Orbit Length is required').isNumeric().withMessage('Orbit Length must be number'), (0, _expressValidator.check)('color').trim().isLength({
  min: 7,
  max: 7
}).withMessage("Color should be exactly 7 characters long and start with '#'"), (0, _expressValidator.check)('biography').trim().notEmpty().withMessage('Biography is required')];
var _default = memberDetailsSchema;
exports.default = _default;