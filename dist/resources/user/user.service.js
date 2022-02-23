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
const user_modal_1 = __importDefault(require("@/resources/user/user.modal"));
class UserService {
    constructor() {
        this.user = user_modal_1.default;
    }
    create(type, label, required, visible) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = this.user.create({ type, label, required, visible });
                return user;
            }
            catch (error) {
                throw new Error('Unable to create post');
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.user.find();
                return users;
            }
            catch (error) {
                throw new Error('Unable to create post');
            }
        });
    }
}
exports.default = UserService;
