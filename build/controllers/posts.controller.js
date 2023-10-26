"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeed = exports.getUserPosts = exports.getPost = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const Follow_1 = require("../models/Follow");
const Post_1 = require("../models/Post");
const PostMedia_1 = require("../models/PostMedia");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, text, media } = req.body;
        const newPost = new Post_1.Post({
            userId: user === null || user === void 0 ? void 0 : user.id,
            text
        });
        const post = yield newPost.save();
        if (post) {
            for (let i = 0; i < (media === null || media === void 0 ? void 0 : media.length); i++) {
                const newMedia = new PostMedia_1.PostMedia({
                    postId: post.id,
                    media: media[i]
                });
                yield newMedia.save();
            }
            return res.status(201).json({
                success: true,
                message: `Your post has been created`,
                data: []
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Post Creation failed!",
                data: [],
            });
        }
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, media, postId } = req.body;
        yield Post_1.Post.update({ text }, { where: { id: postId } });
        yield PostMedia_1.PostMedia.destroy({ where: { postId } });
        for (let i = 0; i < (media === null || media === void 0 ? void 0 : media.length); i++) {
            const newMedia = new PostMedia_1.PostMedia({
                postId,
                media: media[i]
            });
            yield newMedia.save();
        }
        return res.status(201).json({
            success: true,
            message: `Your post has been updated`,
            data: []
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.body;
        yield Post_1.Post.destroy({ where: { id: postId } });
        yield PostMedia_1.PostMedia.destroy({ where: { postId } });
        return res.status(201).json({
            success: true,
            message: `Your post has been deleted`,
            data: []
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.deletePost = deletePost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.query;
        const post = yield Post_1.Post.findOne({ where: { id: postId }, include: PostMedia_1.PostMedia });
        return res.status(201).json({
            success: true,
            message: `Your post has been retreived`,
            data: [post]
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.getPost = getPost;
const getUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        const posts = yield Post_1.Post.findAll({ where: { userId }, include: [{ "model": PostMedia_1.PostMedia, "attributes": ["media"] }], raw: true });
        return res.status(201).json({
            success: true,
            message: `Your posts has been retreived`,
            data: [posts]
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.getUserPosts = getUserPosts;
const getFeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const following = yield Follow_1.Follow.findAll({
            attributes: ["followRecId"],
            where: { followReqId: user.id, isAccepted: true }
        });
        const followingIds = following.map(x => x.followRecId);
        const posts = yield Post_1.Post.findAll({ where: { userId: followingIds }, include: [{ "model": PostMedia_1.PostMedia, "attributes": ["media"] }], raw: true });
        return res.status(201).json({
            success: true,
            message: `Your feed posts has been retreived`,
            data: [posts]
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.getFeed = getFeed;
