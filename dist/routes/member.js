"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const member_details_schema_1 = __importDefault(require("../schemas/member-details-schema"));
const index_1 = require("../middlewares/index");
const id_schema_1 = __importDefault(require("../schemas/id-schema"));
const express_1 = __importDefault(require("express"));
const member_controller_1 = require("../controllers/member-controller");
const router = express_1.default.Router();
router.get('/all-members', member_controller_1.getAllMembers);
router.delete('/delete-member', id_schema_1.default, index_1.validateRequestSchema, member_controller_1.deleteMember);
router.post('/get-one-member', id_schema_1.default, index_1.validateRequestSchema, member_controller_1.getOneMember);
router.post('/add-member', member_details_schema_1.default, index_1.validateRequestSchema, member_controller_1.addMember);
router.put('/change-member', id_schema_1.default, member_details_schema_1.default, index_1.validateRequestSchema, member_controller_1.changeMember);
router.patch('/upload-member-image', member_controller_1.uploadMemberPhoto, id_schema_1.default, index_1.validateRequestSchema, member_controller_1.uploadImage);
exports.default = router;
