import mongoose from "mongoose";
import { Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface";
import { CreateUserDto } from "../dto/CreateUser.dto";
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
    findBy(query: Partial<any>): Promise<any | null> {
        return User.find(query).exec();
    }
    create(item: CreateUserDto): Promise<any> {
        const user = User.create({
            email: item.email,
            password: item.password,
            fullName: item.fullName,
            addresses: [item.address],
            cart: [],
        });
        return user;
    }
    readById(id: string): Promise<any | null> {
        throw new Error("Method not implemented.");
    }
    updateById(id: string, item: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
}
export default new UserDao();