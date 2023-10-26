import { Table, Model, Column, DataType, AllowNull,  ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";
import { User } from "./User";

@Table({
    timestamps: true,
    tableName: "block-users"
})

export class BlockUser extends Model {
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
    blockedByUserId!: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    blockedUserId!: number;

    @BelongsTo(() => User,"blockedByUserId")
    blockedByUser!: User

    @BelongsTo(() => User,"blockedUserId")
    blockedUser!: User

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @DeletedAt
    deletedAt?: Date;
}