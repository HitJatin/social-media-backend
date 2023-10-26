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
exports.unblockUser = exports.blockUser = void 0;
const sequelize_1 = require("sequelize");
const BlockUser_1 = require("../models/BlockUser");
const Follow_1 = require("../models/Follow");
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, blockUserId } = req.body;
        yield Follow_1.Follow.destroy({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        followReqId: user.id,
                        followRecId: blockUserId
                    }, {
                        followReqId: blockUserId,
                        followRecId: user.id
                    }
                ]
            }
        });
        const newBlock = new BlockUser_1.BlockUser({
            blockedByUserId: user === null || user === void 0 ? void 0 : user.id,
            blockedUserId: blockUserId
        });
        const nBlock = yield newBlock.save();
        if (nBlock)
            return res.status(201).json({
                success: true,
                message: `User blocked`,
                data: []
            });
        return res.status(400).json({
            success: false,
            message: "User couldn't be blocked",
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
exports.blockUser = blockUser;
const unblockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, blockedUserId } = req.body;
        yield BlockUser_1.BlockUser.destroy({ where: { blockedByUserId: user.id, blockedUserId } });
        return res.status(201).json({
            success: true,
            message: `User unblocked`,
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
exports.unblockUser = unblockUser;
