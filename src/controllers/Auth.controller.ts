import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import authService from "../services/Auth.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";
import { LoginRequest } from "../dto/Request.dto.js";


const authController = {


    login: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const data: LoginRequest = req.body;
        const result = await authService.login(data);
        res.status(200).json(new ApiResponse(true, 200, "Login successful", result));
    }),

    loginWithGoogle: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { token } = req.query as { token?: string };

        if (!token) {
            throw new ApiError(400, "Bad Request", "Token is required");
        }
        const result = await authService.loginWithGoogle(token);

        res.cookie("token", result.accessToken, { httpOnly: true });
        if (result.role === 'admin') {
            return res.redirect("/admin/dashboard");
        }
        return res.redirect("/");
    }),


    register: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email, fullName, address, isAnonymous } = req.body;
        const user = await authService.register({ email, password: null, fullName, address }, isAnonymous);
        res.status(201).json(new ApiResponse(true, 201, "Đăng ký thành công! Vui lòng kiểm tra email.", user));
    }),


    forgotPassword: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email } = req.body;
        await authService.forgotPassword(email);
        res.status(200).json(new ApiResponse(true, 200, "Password reset email sent", null));
    }),

    activateAccount: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email } = req.body;
        if (!email) {
            throw new ApiError(400, "Bad Request", "Email không được để trống");
        }
        await authService.activateAccount(email);
        res.status(200).json(new ApiResponse(true, 200, "Account activated successfully", null));
    }),

    resetPassword: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { token, newPassword } = req.body;
        if (typeof newPassword !== "string") {
            throw new ApiError(400, "Bad Request", "New password is invalid");
        }
        await authService.resetPassword(token, newPassword);

        res.status(200).json(new ApiResponse(true, 200, "Password has been reset successfully", null));
    }),


    changePassword: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        console.log('Changing password...');
        const userId = (req as any).userId;
        const { oldPassword, newPassword } = req.body;
        if (typeof newPassword !== "string" || typeof oldPassword !== "string") {
            throw new ApiError(400, "Bad Request", "Passwords are invalid");
        }
        const result = await authService.changePassword(userId, oldPassword, newPassword);
        if (!result) {
            throw new ApiError(500, "Internal Server Error", "Failed to change password");
        }
        res.status(200).json(new ApiResponse(true, 200, "Password has been changed successfully", null));
    }),
    refreshToken: expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { refreshToken } = req.body;
        const data = await authService.refreshToken(refreshToken);
        res.status(200).json(new ApiResponse(true, 200, "Token refreshed successfully", data));
    })

}

export default authController;