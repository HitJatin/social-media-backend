import { Table, Model, Column, DataType, AllowNull,  ForeignKey, Default, BelongsTo, AutoIncrement, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";
import { User } from "./User";

@Table({
    timestamps: true,
    tableName: "follows"
})

export class Follow extends Model {
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
    followReqId!: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    followRecId!: number;

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    isAccepted!: number

    @BelongsTo(() => User,"followReqId")
    reqUser!: User

    @BelongsTo(() => User,"followRecId")
    recUser!: User

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @DeletedAt
    deletedAt?: Date;
}