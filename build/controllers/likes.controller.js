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
exports.deleteLike = exports.getAllLikesPost = exports.createLike = void 0;
const Like_1 = require("../models/Like");
const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, postId } = req.body;
        const newLike = new Like_1.Like({
            userId: user === null || user === void 0 ? void 0 : user.id,
            postId
        });
        const like = yield newLike.save();
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
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.createLike = createLike;
const getAllLikesPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.query;
        const likes = yield Like_1.Like.findAll({ where: { postId } });
        return res.status(201).json({
            success: true,
            message: `Your likes of post has been retreived`,
            data: [likes]
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
exports.getAllLikesPost = getAllLikesPost;
const deleteLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { likeId } = req.body;
        yield Like_1.Like.destroy({ where: { id: likeId } });
        return res.status(201).json({
            success: true,
            message: `Your like has been deleted`,
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
exports.deleteLike = deleteLike;
