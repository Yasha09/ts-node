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
const appError_1 = __importDefault(require("@/utils/appError"));
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            const errors = [];
            err.details.forEach((error) => {
                errors.push(error.message);
            });
            next(new appError_1.default(`${errors[0]}`, 400));
        });
    };
};
function validationMiddleware(schema) {
    return catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripeUnknown: true,
        };
        const value = yield schema.validateAsync(req.body, validationOptions);
        req.body = value;
        next();
    }));
}
exports.default = validationMiddleware;
