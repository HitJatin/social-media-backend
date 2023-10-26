import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import { User } from "../models/User";

const { AUTHEMAIL, AUTHPASSWORD } = process.env;
const JWTKEY: string = process.env.JWTKEY || "MYNAME-IS-HELLOWORLD";

export const signup: RequestHandler = async (req, res) => {
    try {
        const { firstName, middleName, lastName, profilePhoto, email, password, username, dob, country } = req.body;
        const sPass = await securePass(password);

        const token = jwt.sign({ username, email }, JWTKEY, {
            expiresIn: "2h",
        });
        const newUser = new User({
            firstName,
            middleName,
            lastName,
            profilePhoto,
            email,
            password: sPass,
            username,
            dob,
            country,
            token,
        });
        const user = await newUser.save();
        if (user) {
            const isMailSent = await sendVerifyMail(firstName, email, token);

            if (isMailSent)
                return res.status(201).json({
                    success: true,
                    message: `${user.firstName} your Registraton has been successfull please verify your mail`,
                    data: [
                        {
                            FirstName: user.firstName,
                            UserName: user.username,
                            Email: user.email,
                        },
                    ],
                });
            return res.status(400).json({
                success: false,
                message: "Some error occured. Please try again later.",
                data: []
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Your registration has been failed!",
                data: [],
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

export const resendToken: RequestHandler = async (req, res) => {
    try {
        const { user } = req.body;
        const token = jwt.sign({ username: user.username, email: user.email }, JWTKEY, {
            expiresIn: "2h",
        });
        await User.update(
            {
                token
            },
            {
                where: { id: user.id }
            },
        );
        const isMailSent = await sendVerifyMail(user.firstName, user.email, token);

        if (isMailSent)
            return res.status(201).json({
                success: true,
                message: `${user.firstName} your Registraton has been successfull please verify your mail`,
                data: [
                    {
                        FirstName: user.firstName,
                        UserName: user.username,
                        Email: user.email,
                    },
                ],
            });
        return res.status(400).json({
            success: false,
            message: "Some error occured. Please try again later.",
            data: []
        })

    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const activateAccount: RequestHandler = async (req: any, res) => {
    try {
        const email = req.body.decodedToken?.email;
        const updatedInfo = await User.update(
            {
                isVerified: 1,
                token: ""
            },
            {
                where: { email }
            },
        );
        if (updatedInfo)
            return res.status(201).json({
                success: true,
                message: `Hurray! ${req.body.user.firstName} Your Accound has been Verified!`,
                data: []
            });
        return res.status(400).json({
            success: false,
            message: `Some error occured`,
            data: []
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const signin: RequestHandler = async (req, res) => {
    try {
        const { user } = req.body;
        const token = jwt.sign(
            { id: user.id, createdAt: user.createdAt },
            JWTKEY,
            {
                expiresIn: 86400 /*==== Expires in 24 hrs ====*/,
            },
        );
        await User.update(
            { signedToken: token },
            { where: { email: user.email } },
        );

        return res.status(200).json({
            success: true,
            message: ` ${user.firstName} Loggedin SuccessFully!`,
            data: [
                {
                    name: user.firstName,
                    email: user.email,
                    username: user.username,
                    token
                },
            ],
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const getUserData: RequestHandler = async (req, res) => {
    try {
        const { user } = req.body;
        const getUser = await User.findAll({
            attributes: { exclude: ['token', 'isVerified', 'signedToken', 'password'] },
            where: { id: user.id }
        })
        return res.status(200).json({
            success: true,
            message: `Data of user fetched successfully`,
            data: [
                getUser
            ],
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const getPublicUserData: RequestHandler = async (req, res) => {
    try {
        const { username } = req.query;
        const user = await User.findAll({
            attributes: { exclude: ['id', 'email', 'token', 'isVerified', 'signedToken', 'password'] },
            where: { username }
        })
        return res.status(200).json({
            success: true,
            message: `Data of user fetched successfully`,
            data: [
                user
            ],
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const resetPass: RequestHandler = async (req, res) => {
    try {
        const { user, newPassword } = req.body;
        const sPassword = await securePass(newPassword);
        await User.update(
            { password: sPassword },
            { where: { username: user.username } },
        );
        return res.status(200).json({
            success: true,
            message: "Password Changed Succesfully!",
            data: []
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const forgetPass: RequestHandler = async (req, res) => {
    try {
        const { email, username, user } = req.body;
        const token = jwt.sign({ username, email }, JWTKEY, {
            expiresIn: "1h",
        });
        await User.update(
            { token },
            { where: { email } },
        );
        const isMailSent = await sendResetPassMail(user.firstName, user.email, token);

        if (isMailSent)
            return res.status(200).json({
                success: true,
                message: "Please check your mail for reset your password!",
                data: []
            });
        return res.status(400).json({
            success: false,
            message: "Some error occured. Please try again later.",
            data: []
        })
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const signout: RequestHandler = async (req, res) => {
    try {
        await User.update(
            { signedToken: "" },
            { where: { id: req.body.user.id } },
        );

        return res.status(200).json({
            success: true,
            message: "User SuccessFully Logout",
            data: []
        });
    } catch (error: any) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const verifyPass: RequestHandler = async (req, res) => {
    try {
        const { user, password } = req.body;

        jwt.verify(user.token, JWTKEY, async (err: any, decodedToken: any) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                    data: [],
                });
            }
            const forgetSecPass = await securePass(password);
            await User.update(
                { password: forgetSecPass, token: "" },
                {
                    where: { id: user.id }
                },
            );
            return res.status(201).json({
                success: true,
                msg: "Hurray! Your Password has been Changed",
                data: [],
            });
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const updateUser: RequestHandler = async (req, res) => {
    try {
        const { profilePhoto, firstName, middleName, lastName, dob, country, username, email, user } = req.body;

        await User.update(
            {
                profilePhoto, firstName, middleName, lastName, email, username, dob, country
            },
            {
                where: { id: user?.id }
            }
        )

        return res.status(200).json({
            success: true,
            message: "User data updated successfully",
            data: [],
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

export const deleteUser: RequestHandler = async (req, res) => {
    try {
        const { user } = req.body;

        await User.destroy(
            {
                where: { id: user.id }
            }
        )

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: [],
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
}

const securePass = async (password: string) => {
    try {
        const hashPass: string = await bcrypt.hash(password.toString(), 10);

        return hashPass;
    } catch (error: any) {
        console.log(error.message);
    }
};

const sendVerifyMail = async (name: string, email: string, token: string) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: AUTHEMAIL,
                pass: AUTHPASSWORD,
            },
        });
        const mailOption = {
            from: AUTHEMAIL,
            to: email,
            subject: "For Verification Mail ✔",
            html: `<p>Hello ${name} ,
				Here is your token ${token}.</p>`,
        };
        transporter.sendMail(mailOption, (err, mailed) => {
            if (err) {
                console.log(err.message);
                return false;
            } else {
                console.log(`Email has been Sent :- `, mailed.response);
            }
        });
        return true;
    } catch (error: any) {
        console.log(error.message);
        return false;
    }
};

const sendResetPassMail = async (name: string, email: string, token: string) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: AUTHEMAIL,
                pass: AUTHPASSWORD,
            },
        });

        const mailOption = {
            from: AUTHEMAIL,
            to: email,
            subject: "For Reset Password ✔",
            html: `<p>Hello ${name} ,
				Here is your token ${token}.</p>`,
        };
        transporter.sendMail(mailOption, (err, mailed) => {
            if (err) {
                console.log(err.message);
                return false;
            } else {
                console.log(`Email has been Sent :- `, mailed.response);
            }
        });
        return true;
    } catch (error: any) {
        console.log(error.message);
        return false;
    }
};