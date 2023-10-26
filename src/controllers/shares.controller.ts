import { RequestHandler } from "express";
import { Comment } from "../models/Comment";
import { Share } from "../models/Share";

export const createShare: RequestHandler = async (req, res) => {
    try {
        const { user, text, postId } = req.body;
        const newShare = new Share({
            userId: user?.id,
            postId,
            text
        });
        const share = await newShare.save();
        if (share)
            return res.status(201).json({
                success: true,
                message: `You shared the post`,
                data: []
            });
        return res.status(400).json({
            success: false,
            message: "Share couldn't be added",
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

export const getShare: RequestHandler = async (req, res) => {
    try {
        const { shareId } = req.query;
        const share = await Share.findOne({ where: { id: shareId }});
        return res.status(201).json({
            success: true,
            message: `Your share has been retreived`,
            data: [share]
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const getAllSharesPost: RequestHandler = async (req, res) => {
    try {
        const { postId } = req.query;
        const shares = await Share.findAll({ where: { postId }});
        return res.status(201).json({
            success: true,
            message: `Your shares on post has been retreived`,
            data: [shares]
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const updateShare: RequestHandler = async (req, res) => {
    try {
        const { shareId, text } = req.body;
        await Share.update({ text }, { where: { id: shareId }});
        return res.status(201).json({
            success: true,
            message: `Your share has been updated`,
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

export const deleteShare: RequestHandler = async (req, res) => {
    try {
        const { shareId } = req.body;
        await Share.destroy({ where: { id: shareId }});
        return res.status(201).json({
            success: true,
            message: `Your share has been deleted`,
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