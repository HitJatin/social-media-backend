import { Table, Model, Column, DataType, AllowNull,  ForeignKey, Default, BelongsTo, AutoIncrement, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";
import { Post } from "./Post";
import { ReportUser } from "./ReportUser";

@Table({
    timestamps: true,
    tableName: "report-posts"
})

export class ReportPost extends Model {
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

    @ForeignKey(() => ReportUser)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    reportId!: number;

    @BelongsTo(() => Post)
    reportedPost!: Post

    @BelongsTo(() => ReportUser)
    report!: ReportUser

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @DeletedAt
    deletedAt?: Date;
}