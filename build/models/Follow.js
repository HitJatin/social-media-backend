"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
let Follow = class Follow extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Follow.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Follow.prototype, "followReqId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Follow.prototype, "followRecId", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN
    })
], Follow.prototype, "isAccepted", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User, "followReqId")
], Follow.prototype, "reqUser", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User, "followRecId")
], Follow.prototype, "recUser", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Follow.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], Follow.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt
], Follow.prototype, "deletedAt", void 0);
Follow = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "follows"
    })
], Follow);
exports.Follow = Follow;
