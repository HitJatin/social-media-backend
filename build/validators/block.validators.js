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
exports.validateUnblockUser = exports.validateBlockUser = void 0;
const joi_1 = __importDefault(require("joi"));
const BlockUser_1 = require("../models/BlockUser");
const User_1 = require("../models/User");
const validateBlockUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blockUserSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            blockUserId: joi_1.default.number()
                .required()
        });
        const blockUser = yield blockUserSchema.validateAsync(req.body);
        const user = yield User_1.User.findAll({ where: { id: blockUser.blockUserId } });
        if (!user || user.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid UserId",
                data: [],
            });
        }
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateBlockUser = validateBlockUser;
const validateUnblockUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unblockUserSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            blockedUserId: joi_1.default.number()
                .required()
        });
        const blockedUser = yield unblockUserSchema.validateAsync(req.body);
        const user = yield User_1.User.findAll({ where: { id: blockedUser.blockedUserId } });
        if (!user || user.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid UserId",
                data: [],
            });
        }
        const blockedData = yield BlockUser_1.BlockUser.findAll({ where: { blockedByUserId: blockedUser.user.id, blockedUserId: blockedUser.blockedUserId } });
        if (!blockedData || blockedData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "User is already unblocked",
                data: [],
            });
        }
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateUnblockUser = validateUnblockUser;
