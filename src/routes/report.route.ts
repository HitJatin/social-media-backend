import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { validateReportUser, validateReportPost } from "../validators/report.validators";
import { reportUser, reportPost } from "../controllers/report.controller";

const router = Router();

router.post("/report-user", [verifyToken, validateReportUser], reportUser);
router.post("/report-post", [verifyToken, validateReportPost], reportPost);

export default router;