"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const memberDetailsSchema = [
    (0, express_validator_1.check)('name')
        .exists()
        .trim()
        .isLength({
        min: 3,
    })
        .withMessage('Name should be at least 3 characters long'),
    (0, express_validator_1.check)('instrument')
        .exists()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Instrument should be at least 2 characters long'),
    (0, express_validator_1.check)('orbitLength')
        .exists()
        .trim()
        .withMessage('Orbit Length is required')
        .isNumeric()
        .withMessage('Orbit number should be number'),
    (0, express_validator_1.check)('color')
        .trim()
        .isLength({
        min: 7,
        max: 7,
    })
        .withMessage("Color should be exactly 7 characters long and start with '#'"),
    (0, express_validator_1.check)('biography').trim().withMessage('Biography is required'),
];
exports.default = memberDetailsSchema;
