import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import authService from "../services/Auth.service";
import ApiResponse from "../utils/Api.response";
import ApiError from "../utils/ApiError";
const authController = {

    login: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        if (typeof password !== "string") {
            throw new ApiError(400, "Bad Request", "User password is invalid");
        }
        const data = await authService.login(email, password);

        res.status(200).json(new ApiResponse(true, 200, "Login successful", data));

    })
    ,
    register: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email, password, fullName, address } = req.body;
        const user = await authService.register({ email, password, fullName, address });
        res.status(201).json(new ApiResponse(true, 201, "User created successfully", user));
    })
}

export default authController;