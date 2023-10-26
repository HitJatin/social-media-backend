import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { validateCreateShareInfo, validateGetShareInfo, validateGetAllSharesPostInfo, validateEditShareInfo, validateDeleteShareInfo } from "../validators/shares.validators";
import { createShare, getShare, getAllSharesPost, updateShare, deleteShare } from "../controllers/shares.controller";

const router = Router();

router.post("/create", [verifyToken, validateCreateShareInfo], createShare);

router.get("/get-share", validateGetShareInfo, getShare);

router.get("/get-all-shares-post",validateGetAllSharesPostInfo, getAllSharesPost);

router.put("/update", [verifyToken, validateEditShareInfo], updateShare);

router.delete("/delete", [verifyToken, validateDeleteShareInfo], deleteShare);


export default router;