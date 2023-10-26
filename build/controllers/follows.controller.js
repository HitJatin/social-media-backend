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
exports.getCommonFollow = exports.getFollowing = exports.getFollowers = exports.acceptFollow = exports.deleteFollowReq = exports.addFollowReq = void 0;
const Follow_1 = require("../models/Follow");
const User_1 = require("../models/User");
const addFollowReq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requestedUserId, user } = req.body;
        const newFollowReq = new Follow_1.Follow({
            followReqId: user.id,
            followRecId: requestedUserId
        });
        const followReq = yield newFollowReq.save();
        if (followReq)
            return res.status(201).json({
                success: true,
                message: `Follow Req Added`,
                data: []
            });
        return res.status(400).json({
            success: false,
            message: `Follow Req failed`,
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
exports.addFollowReq = addFollowReq;
const deleteFollowReq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { followId } = req.body;
        yield Follow_1.Follow.destroy({
            where: { id: followId }
        });
        return res.status(201).json({
            success: true,
            message: `Follow Req Removed`,
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
exports.deleteFollowReq = deleteFollowReq;
const acceptFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { followId } = req.body;
        yield Follow_1.Follow.update({ isAccepted: true }, {
            where: { id: followId }
        });
        return res.status(201).json({
            success: true,
            message: `Follow Req Accepted`,
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
exports.acceptFollow = acceptFollow;
const getFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        const followers = yield Follow_1.Follow.findAll({
            where: { followRecId: userId }
        });
        return res.status(201).json({
            success: true,
            message: `Followers retreived`,
            data: [followers]
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
exports.getFollowers = getFollowers;
const getFollowing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        const folowing = yield Follow_1.Follow.findAll({
            where: { followReqId: userId }
        });
        return res.status(201).json({
            success: true,
            message: `Followings retreived`,
            data: [folowing]
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
exports.getFollowing = getFollowing;
const getCommonFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const { userId } = req.query;
        const userFolowing = yield Follow_1.Follow.findAll({
            attributes: ["recUser.id", "recUser.firstName"],
            where: { followReqId: user.id, isAccepted: true },
            include: [{
                    model: User_1.User,
                    as: "recUser",
                    attributes: []
                }],
            raw: true,
        });
        const reqUserFollowers = yield Follow_1.Follow.findAll({
            attributes: ["reqUser.id", "reqUser.firstName"],
            where: { followRecId: userId, isAccepted: true },
            include: [{
                    model: User_1.User,
                    as: "reqUser",
                    attributes: []
                }],
            raw: true
        });
        const commonFollow = userFolowing.filter(o1 => reqUserFollowers.some(o2 => o1.id === o2.id));
        return res.status(201).json({
            success: true,
            message: `Mutual follows are retreived`,
            data: [commonFollow]
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
exports.getCommonFollow = getCommonFollow;
