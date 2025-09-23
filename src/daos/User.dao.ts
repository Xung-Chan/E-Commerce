import bcrypt from "bcryptjs";
import "dotenv/config";
import mongoose, { InferSchemaType, Schema } from "mongoose";
import { CreateUserDto } from "../dto/Create.dto.js";
import CRUD from "../utils/CRUD.interface.js";

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
        enum: ["active", "inactive", "banned"],
        default: "active"

    }
}, { versionKey: false })
const User = mongoose.model("User", UserSchema)
class UserDao implements CRUD {
    async patchById(id: string, item: Partial<IUser>): Promise<boolean> {
        return await User.updateOne({ _id: id }, { $set: item }).then(result => result.modifiedCount > 0);
    }
    async findBy(query: Partial<any>): Promise<any | null> {
        return await User.find(query).exec();
    }
    async create(item: CreateUserDto): Promise<IUser> {
        const user = User.create({
            email: item.email,
            password: item.password,
            fullName: item.fullName,
            addresses: [item.address],
            cart: [],
        });
        return await user;
    }
    async createAdmin(): Promise<any> {
        const isExist = await User.findOne({ role: "admin" }).exec();
        if (isExist) return;
        const hashedPassword = bcrypt.hashSync("admin", 10);
        const admin = User.create({
            email: process.env.USER_EMAIL || "nmdtruong18032004@gmail.com",
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
        return user
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await User.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async list(): Promise<IUser[]> {
        return await User.find().exec();
    }
}
export const userDao = new UserDao();
export type IUser = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };