"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Comment_1 = require("./Comment");
const Like_1 = require("./Like");
const PostMedia_1 = require("./PostMedia");
const ReportPost_1 = require("./ReportPost");
const Share_1 = require("./Share");
const User_1 = require("./User");
let Post = class Post extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Post.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Post.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], Post.prototype, "text", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Like_1.Like)
], Post.prototype, "likes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Comment_1.Comment)
], Post.prototype, "comments", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Share_1.Share)
], Post.prototype, "shares", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => PostMedia_1.PostMedia)
], Post.prototype, "medias", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ReportPost_1.ReportPost)
], Post.prototype, "reports", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Post.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], Post.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt
], Post.prototype, "deletedAt", void 0);
Post = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "posts"
    })
], Post);
exports.Post = Post;
