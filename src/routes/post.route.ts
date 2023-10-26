import { Router } from "express";

import { createPost, updatePost, deletePost, getPost, getUserPosts, getFeed } from "../controllers/posts.controller";

import { verifyToken } from "../middleware/auth.middleware";

import { validateCreatePostInfo, validateEditPostInfo, validateDeletePostInfo, validateGetPostInfo, validateGetAllPostsUserInfo } from "../validators/posts.validator";

const router = Router();

router.post("/create", [verifyToken, validateCreatePostInfo], createPost);

router.get("/get-post", validateGetPostInfo, getPost);

router.get("/get-all-posts-user",validateGetAllPostsUserInfo, getUserPosts);

router.get("/feed", verifyToken, getFeed);

router.put("/update", [verifyToken, validateEditPostInfo], updatePost);

router.delete("/delete", [verifyToken, validateDeletePostInfo], deletePost);

export default router;