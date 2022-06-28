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
const mongo_1 = __importDefault(require("../config/mongo"));
const User_1 = __importDefault(require("../models/User"));
const readline_1 = __importDefault(require("readline"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const readLine = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const createUser = () => {
    dotenv_1.default.config();
    (() => __awaiter(void 0, void 0, void 0, function* () {
        let mongoose = null;
        mongoose = yield (0, mongo_1.default)();
        try {
            const username = process.env.USER_USERNAME;
            let password;
            if (process.env.USER_PASSWORD && username) {
                if (process.env.USER_PASSWORD.length < 3)
                    throw new Error('Password should be 3 characters long');
                password = yield bcryptjs_1.default.hash(process.env.USER_PASSWORD, 12);
                if (username.length < 3)
                    throw new Error('username should be 3 characters long');
                for (let i = 0; i < username.length; i++) {
                    if (username[i] === username[i].toUpperCase()) {
                        throw new Error('Username should include only lowercase letters and symbols');
                    }
                }
            }
            const newUser = yield User_1.default.create({
                username,
                password,
            });
            console.log('user created successfully');
        }
        catch (error) {
            console.log(error.message);
        }
        yield mongoose.connection.close();
    }))();
};
readLine.question(`username: `, (username) => {
    process.env.USER_USERNAME = username;
    readLine.question(`password: `, (password) => {
        process.env.USER_PASSWORD = password;
        readLine.close();
        createUser();
    });
});
