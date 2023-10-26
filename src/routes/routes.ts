import { Router } from "express";

import authRoutes from "./auth.route";
import postRoutes from "./post.route";
import followRoutes from "./follow.route";
import commentRoutes from "./comment.routes";
import likeRoutes from "./like.routes";
import shareRoutes from "./shares.route";
import blockRoutes from "./block.route";
import reportRoutes from "./report.route";
import utilRoute from "./util.route";
import publicRoute from "./public.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/post", postRoutes);
router.use("/follow", followRoutes);
router.use("/comment", commentRoutes);
router.use("/like", likeRoutes);
router.use("/share", shareRoutes);
router.use("/block", blockRoutes);
router.use("/report", reportRoutes);
router.use("/util", utilRoute);
router.use("/public", publicRoute)

export default router;