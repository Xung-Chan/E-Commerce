// src/controllers/Admin.controller.ts
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import userService from "../services/User.service.js";
import orderService from "../services/Order.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";
import { IUser } from "../daos/User.dao.js"; 

import bcrypt from "bcryptjs";

const adminController = {
    getAllUsersHandler: async (queryParams: any = {}) => {
        const filter: any = {};
        if (queryParams.role) {
            filter.role = queryParams.role; 
        }
        if (queryParams.status) {
            filter.status = queryParams.status;
        }

        if (queryParams.q) {
            const searchRegex = new RegExp(queryParams.q, 'i');
            filter.$or = [
                { fullName: searchRegex },
                { email: searchRegex }, 
            ];
        }
        const users = await userService.getAllUsersForAdmin(filter); 
        return users;
    },

    getUserByIdHandler: async (id: string) => {
        const user = await userService.getUserById(id);
        return user;
    },

    deleteUserHandler: async (id: string): Promise<boolean> => {
        const success = await userService.deleteUserById(id);
        return success;
    },

    createUserHandler: async (data: any) => {
        const newUser = await userService.createUser(data);
        return newUser;
    },

    updateUserStatusHandler: async (id: string, status: string) => {
        const success = await userService.updateUserStatusById(id, status as any);
        return success;
    },
    updateUserDetailHandler: async (userId: string, data: any): Promise<boolean> => {
        let updateData: any = { ...data };
        if (updateData.password) {
            const hashedPassword = bcrypt.hashSync(updateData.password, 10);
            updateData.password = hashedPassword;
        } 
        const success = await userService.updateUserById(userId, updateData); 
        return success;
    },
};

export default adminController;