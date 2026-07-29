"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student",
    },
}, {
    timestamps: true,
});
exports.UserModel = mongoose_1.default.models.User ||
    mongoose_1.default.model("User", UserSchema);
exports.default = exports.UserModel;
