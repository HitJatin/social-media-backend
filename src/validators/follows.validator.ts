import { query, RequestHandler } from "express";
import Joi from "joi";
import { Follow } from "../models/Follow";
import { User } from "../models/User";

export const validateFollowReqInfo: RequestHandler = async (req, res, next) => {
    try {
        const newFollowReqSchema = Joi.object({
            user: Joi.any()
                .required(),

            requestedUserId: Joi.number()
                .required()
        })
        const value = await newFollowReqSchema.validateAsync(req.body);
        const { requestedUserId, user } = value;
        const reqUser = await User.findOne({ where: { id: requestedUserId } })
        if (!reqUser)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid requested user id",
                data: [],
            });
        if (requestedUserId == user.id)
            return res.status(400).json({
                success: false,
                message: "You can't follow yourself",
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
}

export const validateDeleteFollowReqInfo: RequestHandler = async (req, res, next) => {
    try {
        const deleteFollowSchema = Joi.object({
            user: Joi.any()
                .required(),

            followId: Joi.number()
                .required()
        })
        const value = await deleteFollowSchema.validateAsync(req.body);
        const { followId, user } = value;
        const follow = await Follow.findOne({ where: { id: followId } });
        if (!(follow?.followRecId === user.id) && !(follow?.followReqId === user.id))
            return res.status(400).json({
                success: false,
                message: "You can't delete this follow",
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
}

export const validateAcceptFollowReqInfo: RequestHandler = async (req, res, next) => {
    try {
        const acceptFollowSchema = Joi.object({
            user: Joi.any()
                .required(),

            followId: Joi.number()
                .required()
        })
        const value = await acceptFollowSchema.validateAsync(req.body);
        const { followId, user } = value;
        const follow = await Follow.findOne({ where: { id: followId } })
        if (follow?.followRecId !== user.id)
            return res.status(400).json({
                success: false,
                message: "Only requested user can accept request",
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
}

export const validateGetFollowInfo: RequestHandler = async (req, res, next) => {
    try {
        const getFollowSchema = Joi.object({
            userId: Joi.number()
                .required()
        })
        const value = await getFollowSchema.validateAsync(req.query);
        const { userId } = value;
        const user = await User.findOne({ where: { id: userId } })
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
}

export const validateCommonFollow: RequestHandler = async (req, res, next) => {
    try {
        const validateCommonFollow = Joi.object({
            user: Joi.any()
                .required(),

            reqUserId: Joi.number()
                .required()
        })
        const value = await validateCommonFollow.validateAsync({ user: req.body.user, reqUserId: req.query.userId });
        const { user, reqUserId } = value;
        if (user.id == reqUserId)
            return res.status(400).json({
                success: false,
                message: "Please enter a different user id",
                data: []
            })
        const reqUser = await User.findOne({ where: { id: reqUserId } })
        if (!reqUser)
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
}