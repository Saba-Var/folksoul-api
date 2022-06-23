"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const idSchema = [
    (0, express_validator_1.check)('id')
        .trim()
        .isLength({ min: 24, max: 24 })
        .withMessage('id უნდა შეიცავდეს ზუსტად 24 სიმბოლოს'),
];
exports.default = idSchema;
