"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const linkSchema = new Schema({
  linkName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

const Link = _mongoose.default.model('link', linkSchema);

var _default = Link;
exports.default = _default;