import { Sequelize } from "sequelize-typescript";
import { BlockUser } from "../models/BlockUser";
import { Comment } from "../models/Comment";
import { Follow } from "../models/Follow";
import { Like } from "../models/Like";
import { Post } from "../models/Post";
import { PostMedia } from "../models/PostMedia";
import { ReportPost } from "../models/ReportPost";
import { ReportUser } from "../models/ReportUser";
import { Share } from "../models/Share";
import { User } from "../models/User";

// const connection = new Sequelize({
//   dialect: "mysql",
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   logging: false,
//   models: [User, Post, Like, Comment, Share, Follow, PostMedia, BlockUser, ReportPost, ReportUser]
// });

const connection = new Sequelize("test-db", "user", "pass", {
  dialect: "sqlite",
  host: "./dev.sqlite",
  models: [User, Post, Like, Comment, Share, Follow, PostMedia, BlockUser, ReportPost, ReportUser]
});

export default connection;