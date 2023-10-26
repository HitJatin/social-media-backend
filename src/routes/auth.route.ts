import { Router } from "express";

import { signup, resendToken, activateAccount, signin, resetPass, signout, getUserData, getPublicUserData, forgetPass, verifyPass, updateUser, deleteUser } from "../controllers/auth.controller";

import { validateSignupInfo, validateResendTokenInfo, validateActivationInfo, validateSigninInfo, validateResetPassInfo, validateForgetPassInfo, validateVerifyPassInfo, validatePublicUserInfo, validateUpdateUserInfo } from "../validators/auth.validators";

import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", validateSignupInfo, signup);
router.post("/resend-token", validateResendTokenInfo, resendToken);
router.get("/verify",validateActivationInfo, activateAccount);
router.post("/signin", validateSigninInfo, signin);
router.get("/user-private", verifyToken, getUserData);
router.get("/user-public", validatePublicUserInfo, getPublicUserData);
router.post("/reset-pass", [verifyToken, validateResetPassInfo], resetPass);
router.get("/logout", verifyToken, signout);
router.post("/forgot-pass", validateForgetPassInfo, forgetPass);
router.post("/verify-forgot", validateVerifyPassInfo, verifyPass);
router.put("/update", [verifyToken, validateUpdateUserInfo], updateUser);
router.delete("/delete", verifyToken, deleteUser);

export default router;