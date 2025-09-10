import mongoose from "mongoose";
import { Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { CreateUserDto } from "../dto/CreateUser.dto.js";
const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    fullName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    addresses: {
        type: [String],
        require: true
    },
    cart: [{
        productId: String,
        quantity: Number
    }],
    status: {
        type: String,
        enum: ["active", "inactive", "banned"],
        default: "active"

    }
}, { versionKey: false })
const User = mongoose.model("User", UserSchema)
class UserDao implements CRUD {
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        return await User.updateOne({ _id: id }, { $set: item }).then(result => result.modifiedCount > 0);
    }
    async findBy(query: Partial<any>): Promise<any | null> {
        return await User.find(query).exec();
    }
    async create(item: CreateUserDto): Promise<any> {
        const user = User.create({
            email: item.email,
            password: item.password,
            fullName: item.fullName,
            addresses: [item.address],
            cart: [],
        });
        return await user;
    }
    async readById(id: string): Promise<any | null> {
        return await User.findById(id).exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await User.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async list(): Promise<any[]> {
        return await User.find().exec();
    }
}
export default new UserDao();