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
exports.deleteUser = exports.updateUser = exports.verifyPass = exports.signout = exports.forgetPass = exports.resetPass = exports.getPublicUserData = exports.getUserData = exports.signin = exports.activateAccount = exports.resendToken = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const User_1 = require("../models/User");
const { AUTHEMAIL, AUTHPASSWORD } = process.env;
const JWTKEY = process.env.JWTKEY || "MYNAME-IS-HELLOWORLD";
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, middleName, lastName, profilePhoto, email, password, username, dob, country } = req.body;
        const sPass = yield securePass(password);
        const token = jsonwebtoken_1.default.sign({ username, email }, JWTKEY, {
            expiresIn: "2h",
        });
        const newUser = new User_1.User({
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
        const user = yield newUser.save();
        if (user) {
            const isMailSent = yield sendVerifyMail(firstName, email, token);
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
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Your registration has been failed!",
                data: [],
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
exports.signup = signup;
const resendToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const token = jsonwebtoken_1.default.sign({ username: user.username, email: user.email }, JWTKEY, {
            expiresIn: "2h",
        });
        yield User_1.User.update({
            token
        }, {
            where: { id: user.id }
        });
        const isMailSent = yield sendVerifyMail(user.firstName, user.email, token);
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
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.resendToken = resendToken;
const activateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req.body.decodedToken) === null || _a === void 0 ? void 0 : _a.email;
        const updatedInfo = yield User_1.User.update({
            isVerified: 1,
            token: ""
        }, {
            where: { email }
        });
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
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.activateAccount = activateAccount;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const token = jsonwebtoken_1.default.sign({ id: user.id, createdAt: user.createdAt }, JWTKEY, {
            expiresIn: 86400 /*==== Expires in 24 hrs ====*/,
        });
        yield User_1.User.update({ signedToken: token }, { where: { email: user.email } });
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
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.signin = signin;
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const getUser = yield User_1.User.findAll({
            attributes: { exclude: ['token', 'isVerified', 'signedToken', 'password'] },
            where: { id: user.id }
        });
        return res.status(200).json({
            success: true,
            message: `Data of user fetched successfully`,
            data: [
                getUser
            ],
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.getUserData = getUserData;
const getPublicUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        const user = yield User_1.User.findAll({
            attributes: { exclude: ['id', 'email', 'token', 'isVerified', 'signedToken', 'password'] },
            where: { username }
        });
        return res.status(200).json({
            success: true,
            message: `Data of user fetched successfully`,
            data: [
                user
            ],
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.getPublicUserData = getPublicUserData;
const resetPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, newPassword } = req.body;
        const sPassword = yield securePass(newPassword);
        yield User_1.User.update({ password: sPassword }, { where: { username: user.username } });
        return res.status(200).json({
            success: true,
            message: "Password Changed Succesfully!",
            data: []
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.resetPass = resetPass;
const forgetPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, user } = req.body;
        const token = jsonwebtoken_1.default.sign({ username, email }, JWTKEY, {
            expiresIn: "1h",
        });
        yield User_1.User.update({ token }, { where: { email } });
        const isMailSent = yield sendResetPassMail(user.firstName, user.email, token);
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
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.forgetPass = forgetPass;
const signout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.User.update({ signedToken: "" }, { where: { id: req.body.user.id } });
        return res.status(200).json({
            success: true,
            message: "User SuccessFully Logout",
            data: []
        });
    }
    catch (error) {
        return res.status(504).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.signout = signout;
const verifyPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, password } = req.body;
        jsonwebtoken_1.default.verify(user.token, JWTKEY, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                    data: [],
                });
            }
            const forgetSecPass = yield securePass(password);
            yield User_1.User.update({ password: forgetSecPass, token: "" }, {
                where: { id: user.id }
            });
            return res.status(201).json({
                success: true,
                msg: "Hurray! Your Password has been Changed",
                data: [],
            });
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
exports.verifyPass = verifyPass;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profilePhoto, firstName, middleName, lastName, dob, country, username, email, user } = req.body;
        yield User_1.User.update({
            profilePhoto, firstName, middleName, lastName, email, username, dob, country
        }, {
            where: { id: user === null || user === void 0 ? void 0 : user.id }
        });
        return res.status(200).json({
            success: true,
            message: "User data updated successfully",
            data: [],
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        yield User_1.User.destroy({
            where: { id: user.id }
        });
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: [],
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
});
exports.deleteUser = deleteUser;
const securePass = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashPass = yield bcrypt_1.default.hash(password.toString(), 10);
        return hashPass;
    }
    catch (error) {
        console.log(error.message);
    }
});
const sendVerifyMail = (name, email, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let transporter = nodemailer_1.default.createTransport({
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
            }
            else {
                console.log(`Email has been Sent :- `, mailed.response);
            }
        });
        return true;
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
});
const sendResetPassMail = (name, email, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let transporter = nodemailer_1.default.createTransport({
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
            }
            else {
                console.log(`Email has been Sent :- `, mailed.response);
            }
        });
        return true;
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
});
