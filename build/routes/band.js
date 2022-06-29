"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bandController = require("../controllers/band-controller");

var _index = require("../middlewares/index");

var _bandSchema = _interopRequireDefault(require("../schemas/band-schema"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/band-about', _bandController.getBandAbout);
router.put('/change-band-about', _bandSchema.default, _index.validateRequestSchema, _bandController.changeBandAbout);
var _default = router;
exports.default = _default;