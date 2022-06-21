"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const authSchema = [
    (0, express_validator_1.check)('username')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long')
        .isLowercase()
        .withMessage('Username should not contain upper case letters'),
    (0, express_validator_1.check)('password').notEmpty().withMessage('Password is required'),
];
exports.default = authSchema;
