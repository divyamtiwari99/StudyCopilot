"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
exports.env = {
    PORT: Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000),
    MONGODB_URI: (_b = process.env.MONGODB_URI) !== null && _b !== void 0 ? _b : "",
    GEMINI_API_KEY: (_c = process.env.GEMINI_API_KEY) !== null && _c !== void 0 ? _c : "",
    JWT_SECRET: (_d = process.env.JWT_SECRET) !== null && _d !== void 0 ? _d : "",
    JWT_REFRESH_SECRET: (_e = process.env.JWT_REFRESH_SECRET) !== null && _e !== void 0 ? _e : "",
};
