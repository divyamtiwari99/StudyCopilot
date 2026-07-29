"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
var jsonwebtoken_1 = require("jsonwebtoken");
var env_js_1 = require("../../../config/env.js");
function generateAccessToken(userId) {
    return jsonwebtoken_1.default.sign({ userId: userId }, env_js_1.env.JWT_SECRET, {
        expiresIn: "15m",
    });
}
function generateRefreshToken(userId) {
    return jsonwebtoken_1.default.sign({ userId: userId }, env_js_1.env.JWT_REFRESH_SECRET, {
        expiresIn: "30d",
    });
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, env_js_1.env.JWT_SECRET);
}
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, env_js_1.env.JWT_REFRESH_SECRET);
}
