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
exports.validateDeleteLikeInfo = exports.validateGetAllLikesPostInfo = exports.validateCreateLikeInfo = void 0;
const joi_1 = __importDefault(require("joi"));
const Like_1 = require("../models/Like");
const Post_1 = require("../models/Post");
const validateCreateLikeInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createLikeSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            postId: joi_1.default.number()
                .required()
        });
        const value = yield createLikeSchema.validateAsync(req.body);
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
exports.validateCreateLikeInfo = validateCreateLikeInfo;
const validateGetAllLikesPostInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllLikesPostSchema = joi_1.default.object({
            postId: joi_1.default.number()
                .required()
        });
        const value = yield getAllLikesPostSchema.validateAsync(req.query);
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
exports.validateGetAllLikesPostInfo = validateGetAllLikesPostInfo;
const validateDeleteLikeInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteLikeSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            likeId: joi_1.default.number()
                .required()
        });
        const value = yield deleteLikeSchema.validateAsync(req.body);
        const { likeId, user } = value;
        const like = yield Like_1.Like.findOne({ where: { id: likeId } });
        if (!like)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid like id",
                data: [],
            });
        if (like.userId !== user.id)
            return res.status(400).json({
                success: false,
                message: "You can't remove someone else's like",
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
exports.validateDeleteLikeInfo = validateDeleteLikeInfo;
