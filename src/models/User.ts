import { Table, Model, Column, DataType, AllowNull, AutoIncrement, PrimaryKey, Unique, Default, CreatedAt, UpdatedAt, HasMany, DeletedAt } from "sequelize-typescript";
import { DateOnlyDataType } from "sequelize/types";
import { BlockUser } from "./BlockUser";
import { Comment } from "./Comment";
import { Follow } from "./Follow";
import { Like } from "./Like";
import { Post } from "./Post";
import { ReportUser } from "./ReportUser";
import { Share } from "./Share";

@Table({
    timestamps: true,
    tableName: "users"
})

export class User extends Model {
    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.STRING
    })
    profilePhoto!: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    firstName!: string

    @Column({
        type: DataType.STRING
    })
    middleName!: string

    @Column({
        type: DataType.STRING
    })
    lastName!: string

    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    email!: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    password!: string

    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    username!: string

    @Column({
        type: DataType.DATEONLY
    })
    dob!: DateOnlyDataType

    @Column({
        type: DataType.STRING
    })
    country!: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    token!: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    isVerified!: number

    @Column({
        type: DataType.STRING
    })
    signedToken!: string

    @HasMany(() => Post)
    posts!: Post[]

    @HasMany(() => Follow)
    followers!: Follow[]

    @HasMany(() => Follow)
    following!: Follow[]

    @HasMany(() => Like)
    likedPosts!: Like[]

    @HasMany(() => Comment)
    commentedPosts!: Comment[]

    @HasMany(() => Share)
    sharedPosts!: Share[]

    @HasMany(() => BlockUser)
    blockedBy!: BlockUser[]

    @HasMany(() => BlockUser)
    blockedUsers!: BlockUser[]

    @HasMany(() => ReportUser)
    reportedBy!: ReportUser[]

    @HasMany(() => ReportUser)
    reportedUsers!: ReportUser[]

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @DeletedAt
    deletedAt?: Date;
}