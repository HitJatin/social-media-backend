import { RequestHandler } from "express";
import Joi from "joi";
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";

export const validateCreateCommentInfo: RequestHandler = async (req, res, next) => {
    try {
        const createCommentSchema = Joi.object({
            user: Joi.any()
                .required(),

            postId: Joi.number()
                .required(),

            commentId: Joi.number(),

            comment: Joi.string()
                .min(1)
                .max(255)
                .required()
        });
        const value = await createCommentSchema.validateAsync(req.body);
        const post = await Post.findOne({ where: { id: value.postId } });
        if (!post)
            return res.status(400).json({
                success: false,
                message: "Please enter correct postId",
                data: [],
            });
        next();
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateGetCommentInfo: RequestHandler = async (req, res, next) => {
    try {
        const getCommentSchema = Joi.object({
            commentId: Joi.number()
                .required()
        })
        const value = await getCommentSchema.validateAsync(req.query);
        const comment = await Comment.findOne({ where: { id: value.commentId } })
        if (!comment)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid comment id",
                data: [],
            });
        next();
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateGetAllCommentsPostInfo: RequestHandler = async (req, res, next) => {
    try {
        const getAllCommentsPostSchema = Joi.object({
            postId: Joi.number()
                .required()
        })
        const value = await getAllCommentsPostSchema.validateAsync(req.query);
        const post = await Post.findOne({ where: { id: value.postId } })
        if (!post)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid post id",
                data: [],
            });
        next();
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateEditCommentInfo: RequestHandler = async (req, res, next) => {
    try {
        const editCommentSchema = Joi.object({
            user: Joi.any()
                .required(),

            commentId: Joi.number()
                .required(),

            comment: Joi.string()
                .min(1)
                .max(255)
                .required()
        })
        const value = await editCommentSchema.validateAsync(req.body);
        const { commentId, user } = value;
        const comment = await Comment.findOne({ where: { id: commentId } })
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
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateDeleteCommentInfo: RequestHandler = async (req, res, next) => {
    try {
        const deleteCommentSchema = Joi.object({
            user: Joi.any()
                .required(),

            commentId: Joi.number()
                .required()
        })
        const value = await deleteCommentSchema.validateAsync(req.body);
        const comment = await Comment.findOne({ where: { id: value.commentId } })
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
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};