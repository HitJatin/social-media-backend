import { RequestHandler } from "express";
import Joi from "joi";
import { Post } from "../models/Post";
import { User } from "../models/User";

export const validateCreatePostInfo: RequestHandler = async (req, res, next) => {
    try {
        const newPostSchema = Joi.object({
            user: Joi.any()
                .required(),

            text: Joi.string()
                .min(1)
                .max(255),

            media: Joi.array()
                .min(1)
                .items(
                    Joi.string()
                        .min(1)
                        .max(255)
                ),

        }).or('text', 'media');
        await newPostSchema.validateAsync(req.body);
        next();
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateEditPostInfo: RequestHandler = async (req, res, next) => {
    try {
        const editPostSchema = Joi.object({
            user: Joi.any()
                .required(),

            postId: Joi.number()
                .required(),

            text: Joi.string()
                .min(1)
                .max(255),

            media: Joi.array()
                .min(1)
                .items(
                    Joi.string()
                        .min(1)
                        .max(255)
                ),

        }).or('text', 'media');
        const value = await editPostSchema.validateAsync(req.body);
        const post = await Post.findOne({ where: { id: value.postId } })
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
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateDeletePostInfo: RequestHandler = async (req, res, next) => {
    try {
        const deletePostSchema = Joi.object({
            user: Joi.any()
                .required(),

            postId: Joi.number()
                .required()
        })
        const value = await deletePostSchema.validateAsync(req.query);
        const post = await Post.findOne({ where: { id: value.postId } })
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
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateGetPostInfo: RequestHandler = async (req, res, next) => {
    try {
        const getPostSchema = Joi.object({
            postId: Joi.number()
                .required()
        })
        const value = await getPostSchema.validateAsync(req.query);
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

export const validateGetAllPostsUserInfo: RequestHandler = async (req, res, next) => {
    try {
        const getAllPostUserSchema = Joi.object({
            userId: Joi.number()
                .required()
        })
        const value = await getAllPostUserSchema.validateAsync(req.query);
        const user = await User.findOne({ where: { id: value.userId } })
        if (!user)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid user id",
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