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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secretText = process.env.ACCESS_TOKEN_SECRET;
        if (secretText) {
            const { authorization } = req.headers;
            if (!authorization)
                return res.status(401).json({
                    message: 'missing authorization header',
                });
            const token = authorization.trim().split(' ')[1];
            let verified;
            verified = jsonwebtoken_1.default.verify(token, secretText);
            if (verified)
                return next();
            return res.status(401).json({ message: 'User is not authorized' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ message: 'Token is not valid' });
    }
});
exports.default = authMiddleware;
