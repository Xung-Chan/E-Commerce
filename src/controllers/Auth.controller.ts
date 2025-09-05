import { Request, Response } from "express";
import UserModel from "../models/User.model";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
imp
const authController = {

    login: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (typeof user.password !== "string") {
            res.status(500).json({ message: "User password is invalid" });
            return;
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            res.status(401).json({ message: "Password is incorrect" });
            return;
        }

        res.status(200).json({ message: "Login successful" });

    })
    ,
    register: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email, password, fullName, address } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        await UserModel.create({
            email, password: hashedPassword, fullName, addresses: [address], cart: []
        }).then(user => {
            res.status(201).json({ message: "User registered", user });
        })
    })
}

export default authController;