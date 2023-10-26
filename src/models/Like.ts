import { Table, Model, Column, DataType, AllowNull, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";
import { Post } from "./Post";
import { User } from "./User";

@Table({
    timestamps: false,
    tableName: "likes"
})

export class Like extends Model {
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

    @ForeignKey(() => Post)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    postId!: number;

    @BelongsTo(() => User)
    user!: User

    @BelongsTo(() => Post)
    post!: Post

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @DeletedAt
    deletedAt?: Date;
}