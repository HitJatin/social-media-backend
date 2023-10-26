import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { validateCreateCommentInfo, validateGetCommentInfo, validateGetAllCommentsPostInfo, validateEditCommentInfo, validateDeleteCommentInfo } from "../validators/comments.validators";
import { createComment, getComment, getAllCommentsPost, updateComment, deleteComment } from "../controllers/comments.controller";

const router = Router();

router.post("/create", [verifyToken, validateCreateCommentInfo], createComment);

router.get("/get-comment", validateGetCommentInfo, getComment);

router.get("/get-all-comments-post",validateGetAllCommentsPostInfo, getAllCommentsPost);

router.put("/update", [verifyToken, validateEditCommentInfo], updateComment);

router.delete("/delete", [verifyToken, validateDeleteCommentInfo], deleteComment);


export default router;