"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./middlewares/index");
const index_2 = require("./middlewares/index");
const mongo_1 = __importDefault(require("./config/mongo"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const member_1 = __importDefault(require("./routes/member"));
const auth_1 = __importDefault(require("./routes/auth"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
dotenv_1.default.config();
(0, mongo_1.default)();
server.use(express_1.default.json());
server.use('/api-docs', swagger_ui_express_1.default.serve, (0, index_2.swaggerMiddleware)());
server.use(auth_1.default);
server.use((0, cors_1.default)());
server.use(express_1.default.static('public'));
server.use(index_1.authMiddleware);
server.use(member_1.default);
server.listen(process.env.SERVER_PORT, () => {
    console.log(`server listening on port http://localhost:${process.env.SERVER_PORT}`);
});
