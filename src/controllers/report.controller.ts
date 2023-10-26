import { RequestHandler } from "express";
import { Op } from "sequelize";
import { BlockUser } from "../models/BlockUser";
import { Follow } from "../models/Follow";
import { ReportPost } from "../models/ReportPost";
import { ReportUser } from "../models/ReportUser";

export const reportUser: RequestHandler = async (req, res) => {
    try {
        const { user, reportedUserId, message } = req.body;
        await Follow.destroy({
            where: {
                [Op.or]: [
                    {
                        followReqId: user.id,
                        followRecId: reportedUserId
                    }, {
                        followReqId: reportedUserId,
                        followRecId: user.id
                    }
                ]
            }
        });
        const checkBlock = await BlockUser.findAll({
            where: {
                blockedByUserId: user?.id,
                blockedUserId: reportedUserId
            }
        })
        if (!checkBlock || checkBlock.length == 0) {
            const newBlock = new BlockUser({
                blockedByUserId: user?.id,
                blockedUserId: reportedUserId
            });
            const nBlock = await newBlock.save();
            if (!nBlock)
                return res.status(400).json({
                    success: false,
                    message: "User couldn't be blocked",
                    data: [],
                });
        }

        const newReport = new ReportUser({
            reportedByUserId: user.id,
            reportedUserId,
            message
        })
        const nReport = await newReport.save();
        if (!nReport)
            return res.status(400).json({
                success: false,
                message: "Report can't be added",
                data: [],
            });
        return res.status(200).json({
            success: true,
            message: "Report added",
            data: [],
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const reportPost: RequestHandler = async (req, res) => {
    try {
        const { postId, reportId } = req.body;
        const newReportPost = new ReportPost({
            postId, 
            reportId
        })
        const nReportPost = await newReportPost.save();
        if (!nReportPost)
            return res.status(400).json({
                success: false,
                message: "Report on post can't be added",
                data: [],
            });
        return res.status(200).json({
            success: true,
            message: "Report on Post added",
            data: [],
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};