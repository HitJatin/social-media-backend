import { Table, Model, Column, DataType, AllowNull, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, HasMany } from "sequelize-typescript";
import { Post } from "./Post";
import { User } from "./User";

@Table({
    timestamps: true,
    tableName: "comments"
})

export class Comment extends Model {
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

    @AllowNull(false)
    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER
    })
    postId!: number;

    @ForeignKey(() => Comment)
    @Column({
        type: DataType.INTEGER
    })
    commentId!: number;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT
    })
    comment!: string;

    @HasMany(() => Comment)
    comments!: Comment[];

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Post)
    post!: Post;

    @BelongsTo(() => Comment)
    commentedOn!: Comment;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @DeletedAt
    deletedAt?: Date;
}