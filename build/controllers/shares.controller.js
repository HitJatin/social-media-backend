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
exports.deleteShare = exports.updateShare = exports.getAllSharesPost = exports.getShare = exports.createShare = void 0;
const Share_1 = require("../models/Share");
const createShare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, text, postId } = req.body;
        const newShare = new Share_1.Share({
            userId: user === null || user === void 0 ? void 0 : user.id,
            postId,
            text
        });
        const share = yield newShare.save();
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
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.createShare = createShare;
const getShare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shareId } = req.query;
        const share = yield Share_1.Share.findOne({ where: { id: shareId } });
        return res.status(201).json({
            success: true,
            message: `Your share has been retreived`,
            data: [share]
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
exports.getShare = getShare;
const getAllSharesPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.query;
        const shares = yield Share_1.Share.findAll({ where: { postId } });
        return res.status(201).json({
            success: true,
            message: `Your shares on post has been retreived`,
            data: [shares]
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
exports.getAllSharesPost = getAllSharesPost;
const updateShare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shareId, text } = req.body;
        yield Share_1.Share.update({ text }, { where: { id: shareId } });
        return res.status(201).json({
            success: true,
            message: `Your share has been updated`,
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
exports.updateShare = updateShare;
const deleteShare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shareId } = req.body;
        yield Share_1.Share.destroy({ where: { id: shareId } });
        return res.status(201).json({
            success: true,
            message: `Your share has been deleted`,
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
exports.deleteShare = deleteShare;
