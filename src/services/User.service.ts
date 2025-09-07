import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../daos/User.dao";
const userService = {
    createUser: async (data: {
        email: string,
        fullName: string,
        password: string,
        address: string,
    }): Promise<boolean> => {
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        const user = await UserModel.create({
            email: data.email, password: hashedPassword, fullName: data.fullName, address: data.address
        })

        return !!user

    }

}
export default userService;
