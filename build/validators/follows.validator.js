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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCommonFollow = exports.validateGetFollowInfo = exports.validateAcceptFollowReqInfo = exports.validateDeleteFollowReqInfo = exports.validateFollowReqInfo = void 0;
const joi_1 = __importDefault(require("joi"));
const Follow_1 = require("../models/Follow");
const User_1 = require("../models/User");
const validateFollowReqInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newFollowReqSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            requestedUserId: joi_1.default.number()
                .required()
        });
        const value = yield newFollowReqSchema.validateAsync(req.body);
        const { requestedUserId, user } = value;
        const reqUser = yield User_1.User.findOne({ where: { id: requestedUserId } });
        if (!reqUser)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid requested user id",
                data: [],
            });
        if (requestedUserId == user.id)
            return res.status(400).json({
                success: false,
                message: "You can't follow yourself",
                data: [],
            });
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateFollowReqInfo = validateFollowReqInfo;
const validateDeleteFollowReqInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteFollowSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            followId: joi_1.default.number()
                .required()
        });
        const value = yield deleteFollowSchema.validateAsync(req.body);
        const { followId, user } = value;
        const follow = yield Follow_1.Follow.findOne({ where: { id: followId } });
        if (!((follow === null || follow === void 0 ? void 0 : follow.followRecId) === user.id) && !((follow === null || follow === void 0 ? void 0 : follow.followReqId) === user.id))
            return res.status(400).json({
                success: false,
                message: "You can't delete this follow",
                data: [],
            });
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateDeleteFollowReqInfo = validateDeleteFollowReqInfo;
const validateAcceptFollowReqInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const acceptFollowSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            followId: joi_1.default.number()
                .required()
        });
        const value = yield acceptFollowSchema.validateAsync(req.body);
        const { followId, user } = value;
        const follow = yield Follow_1.Follow.findOne({ where: { id: followId } });
        if ((follow === null || follow === void 0 ? void 0 : follow.followRecId) !== user.id)
            return res.status(400).json({
                success: false,
                message: "Only requested user can accept request",
                data: [],
            });
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateAcceptFollowReqInfo = validateAcceptFollowReqInfo;
const validateGetFollowInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getFollowSchema = joi_1.default.object({
            userId: joi_1.default.number()
                .required()
        });
        const value = yield getFollowSchema.validateAsync(req.query);
        const { userId } = value;
        const user = yield User_1.User.findOne({ where: { id: userId } });
        if (!user)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid user id",
                data: [],
            });
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateGetFollowInfo = validateGetFollowInfo;
const validateCommonFollow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateCommonFollow = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            reqUserId: joi_1.default.number()
                .required()
        });
        const value = yield validateCommonFollow.validateAsync({ user: req.body.user, reqUserId: req.query.userId });
        const { user, reqUserId } = value;
        if (user.id == reqUserId)
            return res.status(400).json({
                success: false,
                message: "Please enter a different user id",
                data: []
            });
        const reqUser = yield User_1.User.findOne({ where: { id: reqUserId } });
        if (!reqUser)
            return res.status(400).json({
                success: false,
                message: "Please enter a valid user id",
                data: [],
            });
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateCommonFollow = validateCommonFollow;
