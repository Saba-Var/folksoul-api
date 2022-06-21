"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_1 = __importDefault(require("./config/mongo"));
const auth_1 = __importDefault(require("./routes/auth"));
const server = (0, express_1.default)();
dotenv_1.default.config();
(0, mongo_1.default)();
server.use(express_1.default.json());
server.use(auth_1.default);
server.listen(process.env.SERVER_PORT, () => {
    console.log(`server listening on port http://localhost:${process.env.SERVER_PORT}`);
});
