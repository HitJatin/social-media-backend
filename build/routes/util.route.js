"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../utils/upload");
const util_validators_1 = require("../validators/util.validators");
const util_controller_1 = require("../controllers/util.controller");
const router = (0, express_1.Router)();
router.post("/upload/:type", [util_validators_1.validateUpload, upload_1.upload.single("image")], util_controller_1.uploadImage);
exports.default = router;
