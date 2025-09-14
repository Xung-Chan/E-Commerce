import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { UpdateUserDto } from "../dto/Update.dto.js";
import userService from "../services/User.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";
const userController = {
    getAllUsers: expressAsyncHandler(async (req: Request, res: Response) => {
        const users = await userService.getAllUsers();
        res.status(200).json(new ApiResponse(true, 200, "Users fetched successfully", users));
    }),
    getUserById: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.userId;
        if (!userId) {
            throw new ApiError(400, "Bad Request", "User ID is required");
        }
        const user = await userService.getUserById(userId);
        if (!user) {
            throw new ApiError(404, "Not Found", "User not found");
        }
        res.status(200).json(new ApiResponse(true, 200, "User fetched successfully", user));
    })
    , updateUserById: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.userId;
        if (!userId) {
            throw new ApiError(400, "Bad Request", "User ID is required");
        }
        const data: UpdateUserDto = req.body;
        const result = await userService.updateUserById(userId, data);
        if (!result) {
            throw new ApiError(500, "Internal Server Error", "Failed to update user");
        }
        res.status(200).json(new ApiResponse(true, 200, "User updated successfully", result));
    }),
    banUserById: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.userId;
        if (!userId) {
            throw new ApiError(400, "Bad Request", "User ID is required");
        }
        const result = await userService.banUserById(userId);
        if (!result) {
            throw new ApiError(500, "Internal Server Error", "Failed to ban user");
        }
        res.status(200).json(new ApiResponse(true, 200, "User banned successfully", result));
    })

}
export default userController;
