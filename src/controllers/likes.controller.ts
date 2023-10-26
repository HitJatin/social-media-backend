import { RequestHandler } from "express";
import { Like } from "../models/Like";

export const createLike: RequestHandler = async (req, res) => {
    try {
        const { user, postId } = req.body;
        const newLike = new Like({
            userId: user?.id,
            postId
        });
        const like = await newLike.save();
        if (like)
            return res.status(201).json({
                success: true,
                message: `Your like has been created`,
                data: []
            });
        return res.status(400).json({
            success: false,
            message: "Like couldn't be added",
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

export const getAllLikesPost: RequestHandler = async (req, res) => {
    try {
        const { postId } = req.query;
        const likes = await Like.findAll({ where: { postId }});
        return res.status(201).json({
            success: true,
            message: `Your likes of post has been retreived`,
            data: [likes]
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const deleteLike: RequestHandler = async (req, res) => {
    try {
        const { likeId } = req.body;
        await Like.destroy({ where: { id: likeId }});
        return res.status(201).json({
            success: true,
            message: `Your like has been deleted`,
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