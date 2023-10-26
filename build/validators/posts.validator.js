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
exports.validateGetAllPostsUserInfo = exports.validateGetPostInfo = exports.validateDeletePostInfo = exports.validateEditPostInfo = exports.validateCreatePostInfo = void 0;
const joi_1 = __importDefault(require("joi"));
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
const validateCreatePostInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPostSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            text: joi_1.default.string()
                .min(1)
                .max(255),
            media: joi_1.default.array()
                .min(1)
                .items(joi_1.default.string()
                .min(1)
                .max(255)),
        }).or('text', 'media');
        yield newPostSchema.validateAsync(req.body);
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
exports.validateCreatePostInfo = validateCreatePostInfo;
const validateEditPostInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editPostSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            postId: joi_1.default.number()
                .required(),
            text: joi_1.default.string()
                .min(1)
                .max(255),
            media: joi_1.default.array()
                .min(1)
                .items(joi_1.default.string()
                .min(1)
                .max(255)),
        }).or('text', 'media');
        const value = yield editPostSchema.validateAsync(req.body);
        const post = yield Post_1.Post.findOne({ where: { id: value.postId } });
        if (!post)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid post id",
                data: [],
            });
        if (post.userId !== value.user.id)
            return res.status(400).json({
                success: false,
                message: "You can't edit someone's else post",
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
exports.validateEditPostInfo = validateEditPostInfo;
const validateDeletePostInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletePostSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            postId: joi_1.default.number()
                .required()
        });
        const value = yield deletePostSchema.validateAsync(req.query);
        const post = yield Post_1.Post.findOne({ where: { id: value.postId } });
        if (!post)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid post id",
                data: [],
            });
        if (post.userId !== value.user.id)
            return res.status(400).json({
                success: false,
                message: "You can't delete someone's else post",
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
exports.validateDeletePostInfo = validateDeletePostInfo;
const validateGetPostInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getPostSchema = joi_1.default.object({
            postId: joi_1.default.number()
                .required()
        });
        const value = yield getPostSchema.validateAsync(req.query);
        const post = yield Post_1.Post.findOne({ where: { id: value.postId } });
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
exports.validateGetPostInfo = validateGetPostInfo;
const validateGetAllPostsUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllPostUserSchema = joi_1.default.object({
            userId: joi_1.default.number()
                .required()
        });
        const value = yield getAllPostUserSchema.validateAsync(req.query);
        const user = yield User_1.User.findOne({ where: { id: value.userId } });
        if (!user)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid user id",
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
exports.validateGetAllPostsUserInfo = validateGetAllPostsUserInfo;
