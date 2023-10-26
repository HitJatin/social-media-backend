"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const BlockUser_1 = require("./BlockUser");
const Comment_1 = require("./Comment");
const Follow_1 = require("./Follow");
const Like_1 = require("./Like");
const Post_1 = require("./Post");
const ReportUser_1 = require("./ReportUser");
const Share_1 = require("./Share");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], User.prototype, "profilePhoto", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], User.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], User.prototype, "middleName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], User.prototype, "lastName", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY
    })
], User.prototype, "dob", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], User.prototype, "country", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], User.prototype, "token", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN
    })
], User.prototype, "isVerified", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], User.prototype, "signedToken", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Post_1.Post)
], User.prototype, "posts", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Follow_1.Follow)
], User.prototype, "followers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Follow_1.Follow)
], User.prototype, "following", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Like_1.Like)
], User.prototype, "likedPosts", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Comment_1.Comment)
], User.prototype, "commentedPosts", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Share_1.Share)
], User.prototype, "sharedPosts", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => BlockUser_1.BlockUser)
], User.prototype, "blockedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => BlockUser_1.BlockUser)
], User.prototype, "blockedUsers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ReportUser_1.ReportUser)
], User.prototype, "reportedBy", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ReportUser_1.ReportUser)
], User.prototype, "reportedUsers", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], User.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], User.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt
], User.prototype, "deletedAt", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "users"
    })
], User);
exports.User = User;
