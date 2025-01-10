"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const useMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log("token received" + token);
    const decoded = jsonwebtoken_1.default.verify(token, config_1.jwtPass);
    console.log("decoded token" + decoded);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    res.status(403).json({
        message: "invalid user"
    });
};
exports.useMiddleware = useMiddleware;
