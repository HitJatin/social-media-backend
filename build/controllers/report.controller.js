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
exports.reportPost = exports.reportUser = void 0;
const sequelize_1 = require("sequelize");
const BlockUser_1 = require("../models/BlockUser");
const Follow_1 = require("../models/Follow");
const ReportPost_1 = require("../models/ReportPost");
const ReportUser_1 = require("../models/ReportUser");
const reportUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, reportedUserId, message } = req.body;
        yield Follow_1.Follow.destroy({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        followReqId: user.id,
                        followRecId: reportedUserId
                    }, {
                        followReqId: reportedUserId,
                        followRecId: user.id
                    }
                ]
            }
        });
        const checkBlock = yield BlockUser_1.BlockUser.findAll({
            where: {
                blockedByUserId: user === null || user === void 0 ? void 0 : user.id,
                blockedUserId: reportedUserId
            }
        });
        if (!checkBlock || checkBlock.length == 0) {
            const newBlock = new BlockUser_1.BlockUser({
                blockedByUserId: user === null || user === void 0 ? void 0 : user.id,
                blockedUserId: reportedUserId
            });
            const nBlock = yield newBlock.save();
            if (!nBlock)
                return res.status(400).json({
                    success: false,
                    message: "User couldn't be blocked",
                    data: [],
                });
        }
        const newReport = new ReportUser_1.ReportUser({
            reportedByUserId: user.id,
            reportedUserId,
            message
        });
        const nReport = yield newReport.save();
        if (!nReport)
            return res.status(400).json({
                success: false,
                message: "Report can't be added",
                data: [],
            });
        return res.status(200).json({
            success: true,
            message: "Report added",
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
exports.reportUser = reportUser;
const reportPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, reportId } = req.body;
        const newReportPost = new ReportPost_1.ReportPost({
            postId,
            reportId
        });
        const nReportPost = yield newReportPost.save();
        if (!nReportPost)
            return res.status(400).json({
                success: false,
                message: "Report on post can't be added",
                data: [],
            });
        return res.status(200).json({
            success: true,
            message: "Report on Post added",
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
exports.reportPost = reportPost;
