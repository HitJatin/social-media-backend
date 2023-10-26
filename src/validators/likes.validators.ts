import { RequestHandler } from "express";
import Joi from "joi";
import { Like } from "../models/Like";
import { Post } from "../models/Post";

export const validateCreateLikeInfo: RequestHandler = async (req, res, next) => {
    try {
        const createLikeSchema = Joi.object({
            user: Joi.any()
                .required(),

            postId: Joi.number()
                .required()
        })
        const value = await createLikeSchema.validateAsync(req.body);
        const { postId } = value;
        const post = await Post.findOne({ where: { id: postId } });
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

export const validateGetAllLikesPostInfo: RequestHandler = async (req, res, next) => {
    try {
        const getAllLikesPostSchema = Joi.object({
            postId: Joi.number()
                .required()
        })
        const value = await getAllLikesPostSchema.validateAsync(req.query);
        const { postId } = value;
        const post = await Post.findOne({ where: { id: postId } })
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

export const validateDeleteLikeInfo: RequestHandler = async (req, res, next) => {
    try {
        const deleteLikeSchema = Joi.object({
            user: Joi.any()
                .required(),

            likeId: Joi.number()
                .required()
        })
        const value = await deleteLikeSchema.validateAsync(req.body);
        const { likeId, user } = value;
        const like = await Like.findOne({ where: { id: likeId } })
        if (!like)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid like id",
                data: [],
            });
        if(like.userId !== user.id)
        return res.status(400).json({
            success: false,
            message: "You can't remove someone else's like",
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