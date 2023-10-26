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
exports.validateReportUser = exports.validateReportPost = void 0;
const joi_1 = __importDefault(require("joi"));
const ReportUser_1 = require("../models/ReportUser");
const User_1 = require("../models/User");
const validateReportPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportPostSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            postId: joi_1.default.number()
                .required(),
            reportId: joi_1.default.number()
                .required()
        });
        const reportPost = yield reportPostSchema.validateAsync(req.body);
        const report = yield ReportUser_1.ReportUser.findAll({ where: { id: reportPost.reportId } });
        if (!report || report.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid ReportId",
                data: [],
            });
        }
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
exports.validateReportPost = validateReportPost;
const validateReportUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportUserSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            reportedUserId: joi_1.default.number()
                .required(),
            message: joi_1.default.string()
                .min(5)
                .max(50)
                .required()
        });
        const reportUser = yield reportUserSchema.validateAsync(req.body);
        const reportedUser = yield User_1.User.findAll({ where: { id: reportUser.reportedUserId } });
        if (!reportedUser || reportedUser.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid reportedUserId",
                data: [],
            });
        }
        if (reportUser.user.id == reportUser.reportedUserId)
            return res.status(400).json({
                success: false,
                message: "You can't report yourself",
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
exports.validateReportUser = validateReportUser;
