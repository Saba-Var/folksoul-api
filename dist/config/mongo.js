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
const mongoose_1 = __importDefault(require("mongoose"));
const generateLocalMongoURL = () => {
    const { MONGO_PROTOCOL, MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;
    return `${MONGO_PROTOCOL}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
};
const generateAtlasMongoURL = () => {
    const { MONGO_PROTOCOL, MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_DATABASE, } = process.env;
    return `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}`;
};
const shouldConnectToLocalDatabase = () => process.env.MONGO_PROTOCOL === 'mongodb';
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connectionURL = shouldConnectToLocalDatabase()
            ? generateLocalMongoURL()
            : generateAtlasMongoURL();
        return mongoose_1.default.connect(connectionURL);
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.default = connect;
