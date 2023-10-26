import { RequestHandler } from "express";
import { Follow } from "../models/Follow";
import { Post } from "../models/Post";
import { PostMedia } from "../models/PostMedia";

export const createPost: RequestHandler = async (req, res) => {
    try {
        const { user, text, media } = req.body;
        const newPost = new Post({
            userId: user?.id,
            text
        });
        const post = await newPost.save();
        if (post) {
            for (let i = 0; i < media?.length; i++) {
                const newMedia = new PostMedia({
                    postId: post.id,
                    media: media[i]
                })
                await newMedia.save();
            }
            return res.status(201).json({
                success: true,
                message: `Your post has been created`,
                data: []
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Post Creation failed!",
                data: [],
            });
        }
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const updatePost: RequestHandler = async (req, res) => {
    try {
        const { text, media, postId } = req.body;
        await Post.update({ text }, { where: { id: postId } });
        await PostMedia.destroy({ where: { postId } })
        for (let i = 0; i < media?.length; i++) {
            const newMedia = new PostMedia({
                postId,
                media: media[i]
            })
            await newMedia.save();
        }
        return res.status(201).json({
            success: true,
            message: `Your post has been updated`,
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

export const deletePost: RequestHandler = async (req, res) => {
    try {
        const { postId } = req.body;
        await Post.destroy({ where: { id: postId } });
        await PostMedia.destroy({ where: { postId } })
        return res.status(201).json({
            success: true,
            message: `Your post has been deleted`,
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

export const getPost: RequestHandler = async (req, res) => {
    try {
        const { postId } = req.query;
        const post = await Post.findOne({ where: { id: postId }, include: PostMedia });
        return res.status(201).json({
            success: true,
            message: `Your post has been retreived`,
            data: [post]
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const getUserPosts: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.query;
        const posts = await Post.findAll({ where: { userId }, include: [{ "model": PostMedia, "attributes": ["media"] }], raw: true });
        return res.status(201).json({
            success: true,
            message: `Your posts has been retreived`,
            data: [posts]
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const getFeed: RequestHandler = async (req, res) => {
    try {
        const { user } = req.body;
        const following = await Follow.findAll({
            attributes: ["followRecId"],
            where: { followReqId: user.id, isAccepted: true }
        })
        const followingIds = following.map(x => x.followRecId);
        const posts = await Post.findAll({ where: { userId: followingIds }, include: [{ "model": PostMedia, "attributes": ["media"] }], raw: true });
        return res.status(201).json({
            success: true,
            message: `Your feed posts has been retreived`,
            data: [posts]
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};