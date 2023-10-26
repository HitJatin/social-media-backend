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
exports.validateDeleteShareInfo = exports.validateEditShareInfo = exports.validateGetAllSharesPostInfo = exports.validateGetShareInfo = exports.validateCreateShareInfo = void 0;
const joi_1 = __importDefault(require("joi"));
const Post_1 = require("../models/Post");
const Share_1 = require("../models/Share");
const validateCreateShareInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createShareSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            postId: joi_1.default.number()
                .required(),
            text: joi_1.default.string()
                .min(1)
                .max(255)
        });
        const value = yield createShareSchema.validateAsync(req.body);
        const { postId } = value;
        const post = yield Post_1.Post.findOne({ where: { id: postId } });
        if (!post)
            return res.status(400).json({
                success: false,
                message: "Please enter correct postId",
                data: [],
            });
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
exports.validateCreateShareInfo = validateCreateShareInfo;
const validateGetShareInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getShareSchema = joi_1.default.object({
            shareId: joi_1.default.number()
                .required(),
        });
        const value = yield getShareSchema.validateAsync(req.query);
        const { shareId } = value;
        const share = yield Share_1.Share.findOne({ where: { id: shareId } });
        if (!share)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid share id",
                data: [],
            });
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
exports.validateGetShareInfo = validateGetShareInfo;
const validateGetAllSharesPostInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllSharesPostSchema = joi_1.default.object({
            postId: joi_1.default.number()
                .required(),
        });
        const value = yield getAllSharesPostSchema.validateAsync(req.query);
        const { postId } = value;
        const post = yield Post_1.Post.findOne({ where: { id: postId } });
        if (!post)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid post id",
                data: [],
            });
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
exports.validateGetAllSharesPostInfo = validateGetAllSharesPostInfo;
const validateEditShareInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editShareSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            shareId: joi_1.default.number()
                .required(),
            text: joi_1.default.string()
                .min(1)
                .max(255)
                .required()
        });
        const value = yield editShareSchema.validateAsync(req.body);
        const { shareId, text } = value;
        const share = yield Share_1.Share.findOne({ where: { id: shareId } });
        if (!share)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid share id",
                data: [],
            });
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
exports.validateEditShareInfo = validateEditShareInfo;
const validateDeleteShareInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteShareSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            shareId: joi_1.default.number()
                .required(),
        });
        const value = yield deleteShareSchema.validateAsync(req.body);
        const { shareId, user } = value;
        const share = yield Share_1.Share.findOne({ where: { id: shareId } });
        if (!share)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid share id",
                data: [],
            });
        if (share.userId !== user.id)
            return res.status(400).json({
                success: false,
                message: "You can't delete other's share",
                data: [],
            });
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
exports.validateDeleteShareInfo = validateDeleteShareInfo;
