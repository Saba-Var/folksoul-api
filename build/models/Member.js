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
const memberSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  instrument: {
    type: String,
    required: true,
    minlength: 2
  },
  orbitLength: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 7
  },
  biography: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

const Member = _mongoose.default.model('member', memberSchema);

var _default = Member;
exports.default = _default;