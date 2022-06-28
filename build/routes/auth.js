"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authController = require("../controllers/auth-controller");

var _index = require("../middlewares/index");

var _authSchema = _interopRequireDefault(require("../schemas/auth-schema"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/auth', _authSchema.default, _index.validateRequestSchema, _authController.authentication);
var _default = router;
exports.default = _default;