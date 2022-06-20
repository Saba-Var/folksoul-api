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
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const readline_1 = __importDefault(require("readline"));
const mongo_js_1 = __importDefault(require("../config/mongo.js"));
const User_js_1 = __importDefault(require("../models/User.js"));
const readLine = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const createUser = () => {
    dotenv_1.default.config();
    (() => __awaiter(void 0, void 0, void 0, function* () {
        let mongoose = null;
        mongoose = yield (0, mongo_js_1.default)();
        const username = process.env.USER_USERNAME;
        let password;
        if (process.env.USER_PASSWORD && username)
            password = yield bcryptjs_1.default.hash(process.env.USER_PASSWORD, 12);
        const validUsername = String(username).match(/[a-z]/);
        if (validUsername && password.length >= 3 && username.length >= 3) {
            const newUser = yield new User_js_1.default({
                username,
                password,
            });
            try {
                yield newUser.save();
                console.log("user created successfully");
            }
            catch (error) {
                console.log(error.message);
            }
        }
        else
            console.log("Enter valid email");
        yield mongoose.connection.close();
    }))();
};
readLine.question(`email: `, (email) => {
    process.env.USER_USERNAME = email;
    readLine.question(`password: `, (password) => {
        process.env.USER_PASSWORD = password;
        readLine.close();
        createUser();
    });
});
