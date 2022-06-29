"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../middlewares/index");

var _bandSchema = _interopRequireDefault(require("../schemas/band-schema"));

var _idSchema = _interopRequireDefault(require("../schemas/id-schema"));

var _express = _interopRequireDefault(require("express"));

var _bandController = require("../controllers/band-controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/band-about', _bandController.getBandAbout);
router.put('/change-band-about', _idSchema.default, _bandSchema.default, _index.validateRequestSchema, _bandController.changeBandAbout);
router.patch('/upload-band-image', _bandController.uploadBandPhoto, _idSchema.default, _index.validateRequestSchema, _bandController.uploadImage);
var _default = router;
exports.default = _default;