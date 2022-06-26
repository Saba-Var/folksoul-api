"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const member_controller_1 = require("../controllers/member-controller");
const id_schema_1 = __importDefault(require("../schemas/id-schema"));
const member_details_schema_1 = __importDefault(require("../schemas/member-details-schema"));
const index_1 = require("../middlewares/index");
const router = express_1.default.Router();
router.get('/all-members', member_controller_1.getAllMembers);
router.delete('/delete-member', id_schema_1.default, index_1.validateRequestSchema, member_controller_1.deleteMember);
router.post('/add-member', member_details_schema_1.default, index_1.validateRequestSchema, member_controller_1.addMember);
router.put('/change-member', member_details_schema_1.default, index_1.validateRequestSchema, member_controller_1.changeMember);
exports.default = router;
