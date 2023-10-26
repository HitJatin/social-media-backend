"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const BlockUser_1 = require("../models/BlockUser");
const Comment_1 = require("../models/Comment");
const Follow_1 = require("../models/Follow");
const Like_1 = require("../models/Like");
const Post_1 = require("../models/Post");
const PostMedia_1 = require("../models/PostMedia");
const ReportPost_1 = require("../models/ReportPost");
const ReportUser_1 = require("../models/ReportUser");
const Share_1 = require("../models/Share");
const User_1 = require("../models/User");
// const connection = new Sequelize({
//   dialect: "mysql",
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   logging: false,
//   models: [User, Post, Like, Comment, Share, Follow, PostMedia, BlockUser, ReportPost, ReportUser]
// });
const connection = new sequelize_typescript_1.Sequelize("test-db", "user", "pass", {
    dialect: "sqlite",
    host: "./dev.sqlite",
    models: [User_1.User, Post_1.Post, Like_1.Like, Comment_1.Comment, Share_1.Share, Follow_1.Follow, PostMedia_1.PostMedia, BlockUser_1.BlockUser, ReportPost_1.ReportPost, ReportUser_1.ReportUser]
});
exports.default = connection;
