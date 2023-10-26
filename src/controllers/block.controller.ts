import { RequestHandler } from "express";
import { Op } from "sequelize";
import { BlockUser } from "../models/BlockUser";
import { Follow } from "../models/Follow";

export const blockUser: RequestHandler = async (req, res) => {
    try {
        const { user, blockUserId } = req.body;
        await Follow.destroy({
            where: {
                [Op.or]: [
                    {
                        followReqId: user.id,
                        followRecId: blockUserId
                    }, {
                        followReqId: blockUserId,
                        followRecId: user.id
                    }
                ]
            }
        });
        const newBlock = new BlockUser({
            blockedByUserId: user?.id,
            blockedUserId: blockUserId
        });
        const nBlock = await newBlock.save();
        if (nBlock)
            return res.status(201).json({
                success: true,
                message: `User blocked`,
                data: []
            });
        return res.status(400).json({
            success: false,
            message: "User couldn't be blocked",
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

export const unblockUser: RequestHandler = async (req, res) => {
    try {
        const { user, blockedUserId } = req.body;
        await BlockUser.destroy({ where: { blockedByUserId: user.id, blockedUserId } });
        return res.status(201).json({
            success: true,
            message: `User unblocked`,
            data: []
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};
