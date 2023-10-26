"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMedia = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Post_1 = require("./Post");
let PostMedia = class PostMedia extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], PostMedia.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Post_1.Post),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], PostMedia.prototype, "postId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], PostMedia.prototype, "media", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Post_1.Post)
], PostMedia.prototype, "post", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], PostMedia.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], PostMedia.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt
], PostMedia.prototype, "deletedAt", void 0);
PostMedia = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: "posts-medias"
    })
], PostMedia);
exports.PostMedia = PostMedia;
