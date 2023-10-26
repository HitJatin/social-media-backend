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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getAllCommentsPost = exports.getComment = exports.createComment = void 0;
const Comment_1 = require("../models/Comment");
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, comment, postId, commentId } = req.body;
        const newComment = new Comment_1.Comment({
            userId: user === null || user === void 0 ? void 0 : user.id,
            postId,
            commentId,
            comment
        });
        const nComment = yield newComment.save();
        if (nComment)
            return res.status(201).json({
                success: true,
                message: `Your comment has been created`,
                data: []
            });
        return res.status(400).json({
            success: false,
            message: "Comment couldn't be added",
            data: [],
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.createComment = createComment;
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.query;
        const comment = yield Comment_1.Comment.findOne({ where: { id: commentId } });
        return res.status(201).json({
            success: true,
            message: `Your comment has been retreived`,
            data: [comment]
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.getComment = getComment;
const getAllCommentsPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.query;
        const comments = yield Comment_1.Comment.findAll({ where: { postId } });
        return res.status(201).json({
            success: true,
            message: `Your comments on post has been retreived`,
            data: [comments]
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.getAllCommentsPost = getAllCommentsPost;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId, comment } = req.body;
        yield Comment_1.Comment.update({ comment }, { where: { id: commentId } });
        return res.status(201).json({
            success: true,
            message: `Your comment has been updated`,
            data: []
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.body;
        yield Comment_1.Comment.destroy({ where: { id: commentId } });
        return res.status(201).json({
            success: true,
            message: `Your comment has been deleted`,
            data: []
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.deleteComment = deleteComment;
