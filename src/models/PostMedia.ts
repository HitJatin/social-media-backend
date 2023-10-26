import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Post } from "./Post";

@Table({
    timestamps: true,
    tableName: "posts-medias"
})

export class PostMedia extends Model {
    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @ForeignKey(() => Post)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    postId!: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    media!: string

    @BelongsTo(() => Post)
    post!: Post;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @DeletedAt
    deletedAt?: Date;
}