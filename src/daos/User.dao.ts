import bcrypt from "bcryptjs";
import "dotenv/config";
import mongoose, { InferSchemaType, Schema } from "mongoose";
import { CreateUserDto } from "../dto/Create.dto.js";
import CRUD from "../utils/CRUD.interface.js";
import { WithId } from "../utils/WithId.js";
import ApiError from "../utils/ApiError.js";

export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    BANNED = "banned"
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "anonymous"],
        default: "user"
    },
    addresses: {
        type: [{
            address: {
                type: String,
                required: true
            }
        }],
        required: true
    },
    status: {
        type: String,
        enum: Object.values(UserStatus),
        default: UserStatus.ACTIVE

    },
    point: {
        type: Number,
        default: 0
    },
    deletedAt: {
        type: Date,
        default: null
    },
}, {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
const User = mongoose.model("User", UserSchema)


class UserDao implements CRUD {

    async patchById(id: string, item: Partial<IUser>): Promise<boolean> {
        return await User.updateOne({ _id: id, deletedAt: null }, { $set: item }).then(result => result.modifiedCount > 0);
    }

    async findBy(query: Partial<any>): Promise<IUser[]> {
        const user = await User.find({ ...query, deletedAt: null }).exec();
        return user.map(u => u.toObject() as IUser);
    }

    async findOne(query: Partial<any>): Promise<IUser | null> {
        const user = await User.findOne({ ...query, deletedAt: null }).exec();
        return user ? (user.toObject() as IUser) : null;
    }

    async create(item: CreateUserDto): Promise<IUser> {

        try {
            const user = await User.create({
                email: item.email,
                password: item.password,
                fullName: item.fullName,
                addresses: [{ address: item.address }],
                cart: [],
            });
            return user;
        } catch (error: any) {
            console.error("Error creating user:", error);
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                throw new ApiError(409, "Duplicate Email", "Email đã tồn tại trong hệ thống.");
            }
            throw error;
        }
    }

    async createAdmin(): Promise<any> {
        const isExist = await User.findOne({ role: "admin" }).exec();
        if (isExist) return;
        const hashedPassword = bcrypt.hashSync("admin", 10);
        const admin = User.create({
            email: process.env.USER_EMAIL,
            password: hashedPassword,
            fullName: "Admin",
            addresses: [{ address: "Admin Address" }],
            role: "admin",
            cart: [],
            status: "active"

        });

    }

    async readById(id: string): Promise<IUser | null> {
        const user = await User.findById(id).exec();
        return user ? (user.toObject() as IUser) : null;
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await User.updateOne({ _id: id, deletedAt: null }, { $set: { deletedAt: new Date() } });
        return result.modifiedCount > 0;
    }

    async list(): Promise<IUser[]> {
        return await User.find({ deletedAt: null }).exec();
    }

    async count(query: Partial<any>): Promise<number> {
        return await User.countDocuments({ ...query, deletedAt: null }).exec();
    }

}
export const userDao = new UserDao();
export type IUser = WithId<InferSchemaType<typeof UserSchema>>;