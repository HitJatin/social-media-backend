"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportPost = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Post_1 = require("./Post");
const ReportUser_1 = require("./ReportUser");
let ReportPost = class ReportPost extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], ReportPost.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Post_1.Post),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], ReportPost.prototype, "postId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ReportUser_1.ReportUser),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], ReportPost.prototype, "reportId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Post_1.Post)
], ReportPost.prototype, "reportedPost", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ReportUser_1.ReportUser)
], ReportPost.prototype, "report", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], ReportPost.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], ReportPost.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt
], ReportPost.prototype, "deletedAt", void 0);
ReportPost = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "report-posts"
    })
], ReportPost);
exports.ReportPost = ReportPost;
