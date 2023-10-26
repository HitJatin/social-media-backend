import { RequestHandler } from "express";
import Joi from "joi";
import { ReportUser } from "../models/ReportUser";
import { User } from "../models/User";

export const validateReportPost: RequestHandler = async (req, res, next) => {
    try {
        const reportPostSchema = Joi.object({
            user: Joi.any()
                .required(),

            postId: Joi.number()
                .required(),

            reportId: Joi.number()
                .required()

        });
        const reportPost = await reportPostSchema.validateAsync(req.body);
        const report = await ReportUser.findAll({ where: { id: reportPost.reportId } })
        if (!report || report.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid ReportId",
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

export const validateReportUser: RequestHandler = async (req, res, next) => {
    try {
        const reportUserSchema = Joi.object({
            user: Joi.any()
                .required(),

            reportedUserId: Joi.number()
                .required(),

            message: Joi.string()
                .min(5)
                .max(50)
                .required()
        });
        const reportUser = await reportUserSchema.validateAsync(req.body);
        const reportedUser = await User.findAll({ where: { id: reportUser.reportedUserId}});
        if (!reportedUser || reportedUser.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid reportedUserId",
                data: [],
            })
        }
        if(reportUser.user.id == reportUser.reportedUserId)
        return res.status(400).json({
            success: false,
            message: "You can't report yourself",
            data: [],
        })
        next();
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};