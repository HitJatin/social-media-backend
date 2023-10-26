import { Router } from "express";
import path from "path";

const router = Router();

router.get("/:dir/:filename", (req, res) => {
	const { dir, filename } = req.params;
	res.sendFile(`${path.join(__dirname, "../")}/public/${dir}/${filename}`);
});

export default router;