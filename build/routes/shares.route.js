"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const shares_validators_1 = require("../validators/shares.validators");
const shares_controller_1 = require("../controllers/shares.controller");
const router = (0, express_1.Router)();
router.post("/create", [auth_middleware_1.verifyToken, shares_validators_1.validateCreateShareInfo], shares_controller_1.createShare);
router.get("/get-share", shares_validators_1.validateGetShareInfo, shares_controller_1.getShare);
router.get("/get-all-shares-post", shares_validators_1.validateGetAllSharesPostInfo, shares_controller_1.getAllSharesPost);
router.put("/update", [auth_middleware_1.verifyToken, shares_validators_1.validateEditShareInfo], shares_controller_1.updateShare);
router.delete("/delete", [auth_middleware_1.verifyToken, shares_validators_1.validateDeleteShareInfo], shares_controller_1.deleteShare);
exports.default = router;