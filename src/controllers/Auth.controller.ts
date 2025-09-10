import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import authService from "../services/Auth.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";
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
    , forgotPassword: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email } = req.body;
        await authService.forgotPassword(email);
        res.status(200).json(new ApiResponse(true, 200, "Password reset email sent", null));
    }),
    resetPassword: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { token, newPassword } = req.body;
        if (typeof newPassword !== "string") {
            throw new ApiError(400, "Bad Request", "New password is invalid");
        }
        await authService.resetPassword(token, newPassword);

        res.status(200).json(new ApiResponse(true, 200, "Password has been reset successfully", null));
    }),
    refreshToken: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { refreshToken } = req.body;
        const data = await authService.refreshToken(refreshToken);
        res.status(200).json(new ApiResponse(true, 200, "Token refreshed successfully", data));
    })

}

export default authController;