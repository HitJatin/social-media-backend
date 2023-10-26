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
exports.validateDeleteCommentInfo = exports.validateEditCommentInfo = exports.validateGetAllCommentsPostInfo = exports.validateGetCommentInfo = exports.validateCreateCommentInfo = void 0;
const joi_1 = __importDefault(require("joi"));
const Comment_1 = require("../models/Comment");
const Post_1 = require("../models/Post");
const validateCreateCommentInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createCommentSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            postId: joi_1.default.number()
                .required(),
            commentId: joi_1.default.number(),
            comment: joi_1.default.string()
                .min(1)
                .max(255)
                .required()
        });
        const value = yield createCommentSchema.validateAsync(req.body);
        const post = yield Post_1.Post.findOne({ where: { id: value.postId } });
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
exports.validateCreateCommentInfo = validateCreateCommentInfo;
const validateGetCommentInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getCommentSchema = joi_1.default.object({
            commentId: joi_1.default.number()
                .required()
        });
        const value = yield getCommentSchema.validateAsync(req.query);
        const comment = yield Comment_1.Comment.findOne({ where: { id: value.commentId } });
        if (!comment)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid comment id",
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
exports.validateGetCommentInfo = validateGetCommentInfo;
const validateGetAllCommentsPostInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllCommentsPostSchema = joi_1.default.object({
            postId: joi_1.default.number()
                .required()
        });
        const value = yield getAllCommentsPostSchema.validateAsync(req.query);
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
exports.validateGetAllCommentsPostInfo = validateGetAllCommentsPostInfo;
const validateEditCommentInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editCommentSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            commentId: joi_1.default.number()
                .required(),
            comment: joi_1.default.string()
                .min(1)
                .max(255)
                .required()
        });
        const value = yield editCommentSchema.validateAsync(req.body);
        const { commentId, user } = value;
        const comment = yield Comment_1.Comment.findOne({ where: { id: commentId } });
        if (!comment)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid comment id",
                data: [],
            });
        if (comment.userId !== user.id)
            return res.status(400).json({
                success: false,
                message: "You can't edit someone's else comment",
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
exports.validateEditCommentInfo = validateEditCommentInfo;
const validateDeleteCommentInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteCommentSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            commentId: joi_1.default.number()
                .required()
        });
        const value = yield deleteCommentSchema.validateAsync(req.body);
        const comment = yield Comment_1.Comment.findOne({ where: { id: value.commentId } });
        if (!comment)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid comment id",
                data: [],
            });
        if (comment.userId !== value.user.id)
            return res.status(400).json({
                success: false,
                message: "You can't delete someone's else comment",
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
exports.validateDeleteCommentInfo = validateDeleteCommentInfo;
