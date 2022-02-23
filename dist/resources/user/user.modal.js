"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    required: {
        type: Boolean,
        required: true,
    },
    visible: {
        type: Boolean,
        required: true,
    },
    rows: {
        type: Number,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', UserSchema);
