import { RequestHandler } from "express";
import Joi from "joi";
import { BlockUser } from "../models/BlockUser";
import { User } from "../models/User";

export const validateBlockUser: RequestHandler = async (req, res, next) => {
    try {
        const blockUserSchema = Joi.object({
            user: Joi.any()
                .required(),

            blockUserId: Joi.number()
                .required()

        });
        const blockUser = await blockUserSchema.validateAsync(req.body);
        const user = await User.findAll({ where: { id: blockUser.blockUserId }})
        if(!user || user.length === 0){
            return res.status(400).json({
                success: false,
                message: "Please enter a valid UserId",
                data: [],
            })
        }
        next();
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateUnblockUser: RequestHandler = async (req, res, next) => {
    try {
        const unblockUserSchema = Joi.object({
            user: Joi.any()
                .required(),

            blockedUserId: Joi.number()
                .required()

        });
        const blockedUser = await unblockUserSchema.validateAsync(req.body);
        const user = await User.findAll({ where: { id: blockedUser.blockedUserId }})
        if(!user || user.length === 0){
            return res.status(400).json({
                success: false,
                message: "Please enter a valid UserId",
                data: [],
            })
        }
        const blockedData = await BlockUser.findAll({ where: { blockedByUserId: blockedUser.user.id , blockedUserId: blockedUser.blockedUserId}})
        if(!blockedData || blockedData.length === 0){
            return res.status(400).json({
                success: false,
                message: "User is already unblocked",
                data: [],
            })
        }
        next();
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};