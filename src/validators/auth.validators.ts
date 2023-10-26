import { RequestHandler } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
const JWTKEY: string = process.env.JWTKEY || "MYNAME-IS-HELLOWORLD";

export const validateSignupInfo: RequestHandler = async (req, res, next) => {
    try {
        const signUpSchema = Joi.object({
            profilePhoto: Joi.string(),

            firstName: Joi.string()
                .pattern(/^[a-zA-Z ]+$/)
                .required(),

            middleName: Joi.string()
                .pattern(/^[a-zA-Z ]+$/),

            lastName: Joi.string()
                .pattern(/^[a-zA-Z ]+$/),

            email: Joi.string()
                .email()
                .required(),

            username: Joi.string()
                .alphanum()
                .min(5)
                .max(30)
                .required(),

            password: Joi.string()
                .min(8)
                .max(20)
                .required(),

            dob: Joi.date(),

            country: Joi.string()
                .min(3)
                .max(55)
        })

        const value = await signUpSchema.validateAsync(req.body);
        const { email, username } = value;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists!",
                data: [],
            });
        }
        const checkUsername = await User.findOne({ where: { username } });
        if (checkUsername) {
            return res.status(404).json({
                success: false,
                message: "UserName is already Exist!",
                data: [],
            });
        }

        next();

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateResendTokenInfo: RequestHandler = async (req, res, next) => {
    try {
        const resendTokenSchema = Joi.object({
            email: Joi.string()
                .email()
                .required()
        })

        const value = await resendTokenSchema.validateAsync(req.body);
        const { email } = value;
        const user = await User.findOne({ where: { email } });
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

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateActivationInfo: RequestHandler = async (req, res, next) => {
    try {
        const activationSchema = Joi.object({
            token: Joi.string()
                .required()
        })
        const value = await activationSchema.validateAsync(req.query);
        const verifyUser = await User.findOne({ where: { token: value.token } });
        if (verifyUser?.token) {
            jwt.verify(verifyUser.token, JWTKEY, async (err, decodedToken: any) => {
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
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: `User not found`,
                data: []
            });
        }
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateSigninInfo: RequestHandler = async (req, res, next) => {
    try {
        const signinSchema = Joi.object({
            email: Joi.string()
                .email()
                .required(),

            password: Joi.string()
                .min(8)
                .max(30)
                .required()
        })
        const value = await signinSchema.validateAsync(req.body)
        const user = await User.findOne({ where: { email: value.email } });
        if (user) {
            const passMatch = await bcrypt.compare(value.password, user.password);
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
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Email/Username or Password is incorrect!",
                    data: [],
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                message: "Email/Username or Password is incorrect!",
                data: [],
            });
        }
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: ["in validator"],
        });
    }
};

export const validatePublicUserInfo: RequestHandler = async (req, res, next) => {
    try {
        const publicUserSchema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(5)
                .max(30)
                .required()
        })
        const value = await publicUserSchema.validateAsync(req.query)
        const user = await User.findOne({ where: { username: value.username } });
        if (!user)
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: [],
            });

        req.body.user = user;
        next()
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateResetPassInfo: RequestHandler = async (req, res, next) => {
    try {
        const resetPassSchema = Joi.object({
            user: Joi.any()
                .required(),

            oldPassword: Joi.string()
                .min(8)
                .max(30)
                .required(),

            newPassword: Joi.string()
                .min(8)
                .max(30)
                .required(),
        })
        const value = await resetPassSchema.validateAsync(req.body);
        const passMatch = await bcrypt.compare(
            value.oldPassword,
            value.user.password,
        );
        if (!passMatch) {
            return res.status(404).json({
                success: false,
                message: " Sorry your Password is Incorrect! ",
                data: [],
            });
        }
        next();
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateForgetPassInfo: RequestHandler = async (req, res, next) => {
    try {
        const forgetPassSchema = Joi.object({
            email: Joi.string()
                .email()
                .required()
        })
        const value = await forgetPassSchema.validateAsync(req.body);
        const user = await User.findOne({ where: { email: value.email } });
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
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateVerifyPassInfo: RequestHandler = async (req, res, next) => {
    try {
        const verifyPassSchema = Joi.object({
            token: Joi.string()
                .required(),
            password: Joi.string()
                .min(8)
                .max(30)
                .required(),
        })
        const value = await verifyPassSchema.validateAsync(req.body);
        const user = await User.findOne({ where: { token: value.token } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Token is Incorrect Or Invalid! ",
                data: [],
            });
        }
        jwt.verify(user.token, JWTKEY, async (err, decodedToken) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                    data: [],
                });
            }
            req.body.user = user;
            next();
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const validateUpdateUserInfo: RequestHandler = async (req, res, next) => {
    try {
        const updateUserSchema = Joi.object({
            user: Joi.any()
                .required(),

            profilePhoto: Joi.string(),

            firstName: Joi.string()
                .pattern(/^[a-zA-Z ]+$/),

            middleName: Joi.string()
                .pattern(/^[a-zA-Z ]+$/),

            lastName: Joi.string()
                .pattern(/^[a-zA-Z ]+$/),

            email: Joi.string()
                .email(),

            username: Joi.string()
                .alphanum()
                .min(5)
                .max(30),

            dob: Joi.date(),

            country: Joi.string()
                .min(3)
                .max(55)
        })

        const value = await updateUserSchema.validateAsync(req.body);
        const { email, username } = value;
        if (email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User with this email already exists!",
                    data: [],
                });
            }
        }
        if (username) {
            const checkUsername = await User.findOne({ where: { username } });
            if (checkUsername) {
                return res.status(404).json({
                    success: false,
                    message: "UserName is already Exist!",
                    data: [],
                });
            }
        }
        next();

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};