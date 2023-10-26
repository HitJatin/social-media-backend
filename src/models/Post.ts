import { Table, Model, Column, DataType, AllowNull, AutoIncrement, PrimaryKey, CreatedAt, UpdatedAt, ForeignKey, HasMany, BelongsTo, DeletedAt } from "sequelize-typescript";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { PostMedia } from "./PostMedia";
import { ReportPost } from "./ReportPost";
import { Share } from "./Share";
import { User } from "./User";

@Table({
    timestamps: true,
    tableName: "posts"
})

export class Post extends Model {
    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    userId!: number;
    
    @Column({
        type: DataType.STRING
    })
    text!: string

    @BelongsTo(() => User)
    user!: User

    @HasMany(() => Like)
    likes!: Like[];

    @HasMany(() => Comment)
    comments!: Comment[];

    @HasMany(() => Share)
    shares!: Share[];

    @HasMany(() => PostMedia)
    medias!: PostMedia[];

    @HasMany(() => ReportPost)
    reports!: ReportPost[];

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @DeletedAt
    deletedAt?: Date;
}