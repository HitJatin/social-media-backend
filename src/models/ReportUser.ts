import { Table, Model, Column, DataType, AllowNull,  ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, HasMany } from "sequelize-typescript";
import { ReportPost } from "./ReportPost";
import { User } from "./User";

@Table({
    timestamps: true,
    tableName: "report-users"
})

export class ReportUser extends Model {
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
    reportedByUserId!: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    reportedUserId!: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    message!: string

    @BelongsTo(() => User,"reportedByUserId")
    reportedByUser!: User

    @BelongsTo(() => User,"reportedUserId")
    reportedUser!: User

    @HasMany(() => ReportPost)
    posts!: ReportPost

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @DeletedAt
    deletedAt?: Date;
}