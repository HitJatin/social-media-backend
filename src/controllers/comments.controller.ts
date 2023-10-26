import { RequestHandler } from "express";
import { Comment } from "../models/Comment";

export const createComment: RequestHandler = async (req, res) => {
    try {
        const { user, comment, postId, commentId } = req.body;
        const newComment = new Comment({
            userId: user?.id,
            postId,
            commentId,
            comment
        });
        const nComment = await newComment.save();
        if (nComment)
            return res.status(201).json({
                success: true,
                message: `Your comment has been created`,
                data: []
            });
        return res.status(400).json({
            success: false,
            message: "Comment couldn't be added",
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

export const getComment: RequestHandler = async (req, res) => {
    try {
        const { commentId } = req.query;
        const comment = await Comment.findOne({ where: { id: commentId }});
        return res.status(201).json({
            success: true,
            message: `Your comment has been retreived`,
            data: [comment]
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const getAllCommentsPost: RequestHandler = async (req, res) => {
    try {
        const { postId } = req.query;
        const comments = await Comment.findAll({ where: { postId }});
        return res.status(201).json({
            success: true,
            message: `Your comments on post has been retreived`,
            data: [comments]
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const updateComment: RequestHandler = async (req, res) => {
    try {
        const { commentId, comment } = req.body;
        await Comment.update({ comment }, { where: { id: commentId }});
        return res.status(201).json({
            success: true,
            message: `Your comment has been updated`,
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

export const deleteComment: RequestHandler = async (req, res) => {
    try {
        const { commentId } = req.body;
        await Comment.destroy({ where: { id: commentId }});
        return res.status(201).json({
            success: true,
            message: `Your comment has been deleted`,
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