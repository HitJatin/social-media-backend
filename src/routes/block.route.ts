import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { validateBlockUser, validateUnblockUser } from "../validators/block.validators";
import { blockUser, unblockUser } from "../controllers/block.controller";

const router = Router();

router.post("/block-user", [verifyToken, validateBlockUser], blockUser);
router.delete("/unblock-user", [verifyToken, validateUnblockUser], unblockUser);

export default router;