import { RequestHandler } from "express";
import Joi from "joi";
import { Post } from "../models/Post";
import { Share } from "../models/Share";

export const validateCreateShareInfo: RequestHandler = async (req, res, next) => {
    try {
        const createShareSchema = Joi.object({
            user: Joi.any()
                .required(),

            postId: Joi.number()
                .required(),

            text: Joi.string()
                .min(1)
                .max(255)
        })
        const value = await createShareSchema.validateAsync(req.body);
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

export const validateGetShareInfo: RequestHandler = async (req, res, next) => {
    try {
        const getShareSchema = Joi.object({
            shareId: Joi.number()
                .required(),
        })
        const value = await getShareSchema.validateAsync(req.query);
        const { shareId } = value;
        const share = await Share.findOne({ where: { id: shareId } })
        if (!share)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid share id",
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

export const validateGetAllSharesPostInfo: RequestHandler = async (req, res, next) => {
    try {
        const getAllSharesPostSchema = Joi.object({
            postId: Joi.number()
                .required(),
        })
        const value = await getAllSharesPostSchema.validateAsync(req.query);
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

export const validateEditShareInfo: RequestHandler = async (req, res, next) => {
    try {
        const editShareSchema = Joi.object({
            user: Joi.any()
                .required(),

            shareId: Joi.number()
                .required(),

            text: Joi.string()
                .min(1)
                .max(255)
                .required()
        })
        const value = await editShareSchema.validateAsync(req.body);
        const { shareId, text } = value;
        const share = await Share.findOne({ where: { id: shareId } })
        if (!share)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid share id",
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

export const validateDeleteShareInfo: RequestHandler = async (req, res, next) => {
    try {
        const deleteShareSchema = Joi.object({
            user: Joi.any()
                .required(),

            shareId: Joi.number()
                .required(),
        })
        const value = await deleteShareSchema.validateAsync(req.body);
        const { shareId, user } = value;
        const share = await Share.findOne({ where: { id: shareId } })
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
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};