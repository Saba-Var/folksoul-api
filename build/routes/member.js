"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _memberDetailsSchema = _interopRequireDefault(require("../schemas/member-details-schema"));

var _index = require("../middlewares/index");

var _idSchema = _interopRequireDefault(require("../schemas/id-schema"));

var _express = _interopRequireDefault(require("express"));

var _memberController = require("../controllers/member-controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/all-members', _memberController.getAllMembers);
router.delete('/delete-member', _idSchema.default, _index.validateRequestSchema, _memberController.deleteMember);
router.post('/get-one-member', _idSchema.default, _index.validateRequestSchema, _memberController.getOneMember);
router.post('/add-member', _memberDetailsSchema.default, _index.validateRequestSchema, _memberController.addMember);
router.put('/change-member', _idSchema.default, _memberDetailsSchema.default, _index.validateRequestSchema, _memberController.changeMember);
router.patch('/upload-member-image', _memberController.uploadMemberPhoto, _idSchema.default, _index.validateRequestSchema, _memberController.uploadImage);
var _default = router;
exports.default = _default;