"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

const validateRequestSchema = (req, res, next) => {
  const errors = (0, _expressValidator.validationResult)(req);
  if (!errors.isEmpty()) return res.status(422).json({
    errors: errors.array()
  });
  return next();
};

var _default = validateRequestSchema;
exports.default = _default;