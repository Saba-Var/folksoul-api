"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socialLinkSchema = _interopRequireDefault(require("../schemas/social-link-schema"));

var _index = require("../middlewares/index");

var _idSchema = _interopRequireDefault(require("../schemas/id-schema"));

var _express = _interopRequireDefault(require("express"));

var _linkController = require("../controllers/link-controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/all-links', _linkController.getAllLinks);
router.delete('/delete-link', _idSchema.default, _index.validateRequestSchema, _linkController.deleteLink);
router.post('/add-social-link', _socialLinkSchema.default, _index.validateRequestSchema, _linkController.addLink);
var _default = router;
exports.default = _default;