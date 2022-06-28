"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidator = require("express-validator");

const socialLinkSchema = [(0, _expressValidator.check)('linkName').trim().isLength({
  min: 2
}).withMessage('ბმულის დასახელება უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსაგან'), (0, _expressValidator.check)('url').trim().notEmpty().withMessage('url-ის მითითება სავალდებულოა').isURL().withMessage('მიუთითეთ ვალიდური ბმული')];
var _default = socialLinkSchema;
exports.default = _default;