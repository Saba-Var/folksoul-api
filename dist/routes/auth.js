"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth-controller");
// import { validateRequestSchema } from '../middlewares/index.js'
// import authSchema from '../schemas/auth-schema.js'
const router = express_1.default.Router();
router.post('/auth', auth_controller_1.authentication);
// authSchema, validateRequestSchema,
exports.default = router;
