import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { validateCreateLikeInfo, validateGetAllLikesPostInfo, validateDeleteLikeInfo } from "../validators/likes.validators";
import { createLike, getAllLikesPost, deleteLike } from "../controllers/likes.controller";

const router = Router();

router.post("/create", [verifyToken, validateCreateLikeInfo], createLike);

router.get("/get-all-likes-post",validateGetAllLikesPostInfo, getAllLikesPost);

router.delete("/delete", [verifyToken, validateDeleteLikeInfo], deleteLike);


export default router;