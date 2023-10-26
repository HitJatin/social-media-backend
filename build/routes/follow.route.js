"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const follows_validator_1 = require("../validators/follows.validator");
const follows_controller_1 = require("../controllers/follows.controller");
const router = (0, express_1.Router)();
router.post("/add-follow", [auth_middleware_1.verifyToken, follows_validator_1.validateFollowReqInfo], follows_controller_1.addFollowReq);
router.delete("/delete-follow", [auth_middleware_1.verifyToken, follows_validator_1.validateDeleteFollowReqInfo], follows_controller_1.deleteFollowReq);
router.put("/accept-follow", [auth_middleware_1.verifyToken, follows_validator_1.validateAcceptFollowReqInfo], follows_controller_1.acceptFollow);
router.get("/followers", follows_validator_1.validateGetFollowInfo, follows_controller_1.getFollowers);
router.get("/following", follows_validator_1.validateGetFollowInfo, follows_controller_1.getFollowing);
router.get("/common-follow", [auth_middleware_1.verifyToken, follows_validator_1.validateCommonFollow], follows_controller_1.getCommonFollow);
exports.default = router;
