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
const express_1 = require("express");
const user_service_1 = __importDefault(require("@/resources/user/user.service"));
class UserController {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.UserService = new user_service_1.default();
        this.catchAsync = (fn) => {
            return (req, res, next) => {
                fn(req, res, next).catch(next);
            };
        };
        this.create = this.catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { type, label, required, visible } = req.body;
            const user = yield this.UserService.create(type, label, required, visible);
            return res.status(201).json({ user });
        }));
        this.get = this.catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.UserService.get();
            return res.status(200).json({ users });
        }));
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.get(`${this.path}`, this.get);
        this.router.post(`${this.path}`, this.create);
    }
}
exports.default = UserController;
