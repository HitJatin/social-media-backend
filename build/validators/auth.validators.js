"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUserInfo = exports.validateVerifyPassInfo = exports.validateForgetPassInfo = exports.validateResetPassInfo = exports.validatePublicUserInfo = exports.validateSigninInfo = exports.validateActivationInfo = exports.validateResendTokenInfo = exports.validateSignupInfo = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const JWTKEY = process.env.JWTKEY || "MYNAME-IS-HELLOWORLD";
const validateSignupInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signUpSchema = joi_1.default.object({
            profilePhoto: joi_1.default.string(),
            firstName: joi_1.default.string()
                .pattern(/^[a-zA-Z ]+$/)
                .required(),
            middleName: joi_1.default.string()
                .pattern(/^[a-zA-Z ]+$/),
            lastName: joi_1.default.string()
                .pattern(/^[a-zA-Z ]+$/),
            email: joi_1.default.string()
                .email()
                .required(),
            username: joi_1.default.string()
                .alphanum()
                .min(5)
                .max(30)
                .required(),
            password: joi_1.default.string()
                .min(8)
                .max(20)
                .required(),
            dob: joi_1.default.date(),
            country: joi_1.default.string()
                .min(3)
                .max(55)
        });
        const value = yield signUpSchema.validateAsync(req.body);
        const { email, username } = value;
        const existingUser = yield User_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists!",
                data: [],
            });
        }
        const checkUsername = yield User_1.User.findOne({ where: { username } });
        if (checkUsername) {
            return res.status(404).json({
                success: false,
                message: "UserName is already Exist!",
                data: [],
            });
        }
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateSignupInfo = validateSignupInfo;
const validateResendTokenInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resendTokenSchema = joi_1.default.object({
            email: joi_1.default.string()
                .email()
                .required()
        });
        const value = yield resendTokenSchema.validateAsync(req.body);
        const { email } = value;
        const user = yield User_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No account exists with this email",
                data: [],
            });
        }
        else if (user.isVerified == 1) {
            return res.status(400).json({
                success: false,
                message: "Your accound is already verified!",
                data: [],
            });
        }
        req.body.user = user;
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateResendTokenInfo = validateResendTokenInfo;
const validateActivationInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activationSchema = joi_1.default.object({
            token: joi_1.default.string()
                .required()
        });
        const value = yield activationSchema.validateAsync(req.query);
        const verifyUser = yield User_1.User.findOne({ where: { token: value.token } });
        if (verifyUser === null || verifyUser === void 0 ? void 0 : verifyUser.token) {
            jsonwebtoken_1.default.verify(verifyUser.token, JWTKEY, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: err.message,
                        data: [],
                    });
                }
                req.body.decodedToken = decodedToken;
                req.body.user = verifyUser;
                next();
            }));
        }
        else {
            return res.status(400).json({
                success: false,
                message: `User not found`,
                data: []
            });
        }
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateActivationInfo = validateActivationInfo;
const validateSigninInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signinSchema = joi_1.default.object({
            email: joi_1.default.string()
                .email()
                .required(),
            password: joi_1.default.string()
                .min(8)
                .max(30)
                .required()
        });
        const value = yield signinSchema.validateAsync(req.body);
        const user = yield User_1.User.findOne({ where: { email: value.email } });
        if (user) {
            const passMatch = yield bcrypt_1.default.compare(value.password, user.password);
            if (passMatch) {
                if (user.isVerified === 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Please verify your account!",
                        data: [],
                    });
                }
                req.body.user = user;
                next();
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: "Email/Username or Password is incorrect!",
                    data: [],
                });
            }
        }
        else {
            return res.status(404).json({
                success: false,
                message: "Email/Username or Password is incorrect!",
                data: [],
            });
        }
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: ["in validator"],
        });
    }
});
exports.validateSigninInfo = validateSigninInfo;
const validatePublicUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicUserSchema = joi_1.default.object({
            username: joi_1.default.string()
                .alphanum()
                .min(5)
                .max(30)
                .required()
        });
        const value = yield publicUserSchema.validateAsync(req.query);
        const user = yield User_1.User.findOne({ where: { username: value.username } });
        if (!user)
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: [],
            });
        req.body.user = user;
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validatePublicUserInfo = validatePublicUserInfo;
const validateResetPassInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resetPassSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            oldPassword: joi_1.default.string()
                .min(8)
                .max(30)
                .required(),
            newPassword: joi_1.default.string()
                .min(8)
                .max(30)
                .required(),
        });
        const value = yield resetPassSchema.validateAsync(req.body);
        const passMatch = yield bcrypt_1.default.compare(value.oldPassword, value.user.password);
        if (!passMatch) {
            return res.status(404).json({
                success: false,
                message: " Sorry your Password is Incorrect! ",
                data: [],
            });
        }
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateResetPassInfo = validateResetPassInfo;
const validateForgetPassInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forgetPassSchema = joi_1.default.object({
            email: joi_1.default.string()
                .email()
                .required()
        });
        const value = yield forgetPassSchema.validateAsync(req.body);
        const user = yield User_1.User.findOne({ where: { email: value.email } });
        if (!user) {
            return res.status(480).json({
                success: false,
                message: "User with this email doesn't exist!",
                data: [],
            });
        }
        if (user.isVerified === 0) {
            return res.status(400).json({
                success: false,
                message: "Please Verify your Mail First!",
                data: [],
            });
        }
        req.body.user = user;
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateForgetPassInfo = validateForgetPassInfo;
const validateVerifyPassInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyPassSchema = joi_1.default.object({
            token: joi_1.default.string()
                .required(),
            password: joi_1.default.string()
                .min(8)
                .max(30)
                .required(),
        });
        const value = yield verifyPassSchema.validateAsync(req.body);
        const user = yield User_1.User.findOne({ where: { token: value.token } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Token is Incorrect Or Invalid! ",
                data: [],
            });
        }
        jsonwebtoken_1.default.verify(user.token, JWTKEY, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                    data: [],
                });
            }
            req.body.user = user;
            next();
        }));
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateVerifyPassInfo = validateVerifyPassInfo;
const validateUpdateUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateUserSchema = joi_1.default.object({
            user: joi_1.default.any()
                .required(),
            profilePhoto: joi_1.default.string(),
            firstName: joi_1.default.string()
                .pattern(/^[a-zA-Z ]+$/),
            middleName: joi_1.default.string()
                .pattern(/^[a-zA-Z ]+$/),
            lastName: joi_1.default.string()
                .pattern(/^[a-zA-Z ]+$/),
            email: joi_1.default.string()
                .email(),
            username: joi_1.default.string()
                .alphanum()
                .min(5)
                .max(30),
            dob: joi_1.default.date(),
            country: joi_1.default.string()
                .min(3)
                .max(55)
        });
        const value = yield updateUserSchema.validateAsync(req.body);
        const { email, username } = value;
        if (email) {
            const existingUser = yield User_1.User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User with this email already exists!",
                    data: [],
                });
            }
        }
        if (username) {
            const checkUsername = yield User_1.User.findOne({ where: { username } });
            if (checkUsername) {
                return res.status(404).json({
                    success: false,
                    message: "UserName is already Exist!",
                    data: [],
                });
            }
        }
        next();
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.validateUpdateUserInfo = validateUpdateUserInfo;
