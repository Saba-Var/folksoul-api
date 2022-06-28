"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socialLinkSchema = _interopRequireDefault(require("../schemas/social-link-schema"));

var _index = require("../middlewares/index");

var _linkController = require("../controllers/link-controller");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/add-social-link', _socialLinkSchema.default, _index.validateRequestSchema, _linkController.addLink);
var _default = router;
exports.default = _default;