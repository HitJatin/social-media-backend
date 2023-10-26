import { RequestHandler } from "express";
import { Follow } from "../models/Follow";
import { User } from "../models/User";

export const addFollowReq: RequestHandler = async (req, res) => {
    try {
        const { requestedUserId, user } = req.body;
        const newFollowReq = new Follow({
            followReqId: user.id,
            followRecId: requestedUserId
        })
        const followReq = await newFollowReq.save();
        if(followReq)
        return res.status(201).json({
            success: true,
            message: `Follow Req Added`,
            data: []
        });
        return res.status(400).json({
            success: false,
            message: `Follow Req failed`,
            data: []
        })
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const deleteFollowReq: RequestHandler = async (req, res) => {
    try {
        const { followId } = req.body;
        await Follow.destroy({
            where: { id: followId }
        })
        return res.status(201).json({
            success: true,
            message: `Follow Req Removed`,
            data: []
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const acceptFollow: RequestHandler = async (req, res) => {
    try {
        const { followId } = req.body;
        await Follow.update({isAccepted: true},{
            where: { id: followId }
        })
        return res.status(201).json({
            success: true,
            message: `Follow Req Accepted`,
            data: []
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const getFollowers: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.query;
        const followers = await Follow.findAll({
            where: { followRecId: userId }
        })
        return res.status(201).json({
            success: true,
            message: `Followers retreived`,
            data: [followers]
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const getFollowing: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.query;
        const folowing = await Follow.findAll({
            where: { followReqId: userId }
        })
        return res.status(201).json({
            success: true,
            message: `Followings retreived`,
            data: [folowing]
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const getCommonFollow: RequestHandler = async (req, res) => {
    try {
        const { user } = req.body;
        const { userId } = req.query;
        const userFolowing = await Follow.findAll({
            attributes: ["recUser.id" as "id", "recUser.firstName" as "firstName"],
            where: { followReqId: user.id, isAccepted: true }, 
            include: [{
                model: User,
                as: "recUser",
                attributes: []
            }],
            raw: true,
        })

        const reqUserFollowers = await Follow.findAll({
            attributes: ["reqUser.id" as "id", "reqUser.firstName" as "firstName"],
            where: { followRecId: userId, isAccepted: true },
            include: [{
                model: User,
                as: "reqUser",
                attributes: []
            }],
            raw: true
        })

        const commonFollow = userFolowing.filter(o1 => reqUserFollowers.some(o2 => o1.id === o2.id));

        return res.status(201).json({
            success: true,
            message: `Mutual follows are retreived`,
            data: [commonFollow]
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}