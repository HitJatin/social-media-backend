import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { validateFollowReqInfo, validateDeleteFollowReqInfo, validateAcceptFollowReqInfo, validateGetFollowInfo, validateCommonFollow } from "../validators/follows.validator";
import { addFollowReq, deleteFollowReq, acceptFollow, getFollowers, getFollowing, getCommonFollow } from "../controllers/follows.controller";

const router = Router();

router.post("/add-follow", [verifyToken, validateFollowReqInfo], addFollowReq);

router.delete("/delete-follow", [verifyToken, validateDeleteFollowReqInfo], deleteFollowReq);

router.put("/accept-follow", [verifyToken, validateAcceptFollowReqInfo], acceptFollow);

router.get("/followers", validateGetFollowInfo, getFollowers);

router.get("/following", validateGetFollowInfo, getFollowing);

router.get("/common-follow", [verifyToken, validateCommonFollow], getCommonFollow)

export default router;