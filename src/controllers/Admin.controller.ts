// src/controllers/Admin.controller.ts
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import userService from "../services/User.service.js";
import orderService from "../services/Order.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";

const adminController = {
    getAllUsersHandler: async () => {
        const users = await userService.getAllUsers();
        return users;
    },

    getUserByIdHandler: async (id: string) => {
        const user = await userService.getUserById(id);
        return user;
    },

    updateUserStatusHandler: async (id: string, status: string) => {
        const success = await userService.updateUserStatusById(id, status as any);
        return success;
    },

   
};


export default adminController;
