"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth-controller");
const index_1 = require("../middlewares/index");
const auth_schema_1 = __importDefault(require("../schemas/auth-schema"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/auth', auth_schema_1.default, index_1.validateRequestSchema, auth_controller_1.authentication);
exports.default = router;
