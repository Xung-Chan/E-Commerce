import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/User.model";
export const userService = {
    createUser: async (data: {
        email: string,
        fullName: string,
        password: string,
        address: string,
    }): Promise<boolean> => {
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        const user = await UserModel.create({
            email: data.email, password: hashedPassword, fullName: data.fullName, addresses: [data.address], cart: []
        })

        return !!user

    }
}
