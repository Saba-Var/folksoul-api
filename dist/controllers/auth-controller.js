"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_js_1 = __importDefault(require("../models/User.js"));
const authentication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const currentUser = yield User_js_1.default.findOne({ username });
        if (!currentUser) {
            return res.status(404).json({ message: 'User not exist' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, currentUser.password);
        if (isMatch && process.env.ACCESS_TOKEN_SECRET) {
            const accessToken = jsonwebtoken_1.default.sign({ username, password }, process.env.ACCESS_TOKEN_SECRET);
            return res.status(200).json({ token: accessToken });
        }
        return res.status(404).json({ message: 'Credentials are incorrect!' });
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
});
exports.authentication = authentication;
