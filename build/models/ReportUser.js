"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportUser = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const ReportPost_1 = require("./ReportPost");
const User_1 = require("./User");
let ReportUser = class ReportUser extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], ReportUser.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], ReportUser.prototype, "reportedByUserId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], ReportUser.prototype, "reportedUserId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], ReportUser.prototype, "message", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User, "reportedByUserId")
], ReportUser.prototype, "reportedByUser", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User, "reportedUserId")
], ReportUser.prototype, "reportedUser", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ReportPost_1.ReportPost)
], ReportUser.prototype, "posts", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], ReportUser.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], ReportUser.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt
], ReportUser.prototype, "deletedAt", void 0);
ReportUser = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "report-users"
    })
], ReportUser);
exports.ReportUser = ReportUser;
