"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const memberSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    instrument: {
        type: String,
        required: true,
        minlength: 2,
    },
    orbitLength: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 7,
    },
    biography: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
});
const Member = mongoose_1.default.model('member', memberSchema);
exports.default = Member;
