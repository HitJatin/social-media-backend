"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const post_route_1 = __importDefault(require("./post.route"));
const follow_route_1 = __importDefault(require("./follow.route"));
const comment_routes_1 = __importDefault(require("./comment.routes"));
const like_routes_1 = __importDefault(require("./like.routes"));
const shares_route_1 = __importDefault(require("./shares.route"));
const block_route_1 = __importDefault(require("./block.route"));
const report_route_1 = __importDefault(require("./report.route"));
const util_route_1 = __importDefault(require("./util.route"));
const public_route_1 = __importDefault(require("./public.route"));
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.default);
router.use("/post", post_route_1.default);
router.use("/follow", follow_route_1.default);
router.use("/comment", comment_routes_1.default);
router.use("/like", like_routes_1.default);
router.use("/share", shares_route_1.default);
router.use("/block", block_route_1.default);
router.use("/report", report_route_1.default);
router.use("/util", util_route_1.default);
router.use("/public", public_route_1.default);
exports.default = router;
