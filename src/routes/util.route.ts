import { Router } from "express";
import { upload } from "../utils/upload";
import { validateUpload } from "../validators/util.validators";
import { uploadImage } from "../controllers/util.controller";

const router = Router();

router.post("/upload/:type", [validateUpload, upload.single("image")], uploadImage)

export default router;