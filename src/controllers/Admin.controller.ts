// src/controllers/Admin.controller.ts
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import userService from "../services/User.service.js";
import orderService from "../services/Order.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";
import { IUser } from "../daos/User.dao.js"; 
import couponService from "../services/Coupon.service.js";
import { UpdateCouponDto } from "../dto/Update.dto.js";
import productService from "../services/Product.service.js";
import { CreateProductRequest } from "../dto/Request.dto.js";

import bcrypt from "bcryptjs";

const adminController = {
    //users-management
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
    
    //coupons-management
    getAllCouponsHandler: async (queryParams: any = {}) => {
        const couponPaginationResult = await couponService.getCouponByQuery(queryParams); 
        return couponPaginationResult; 
    },

    deleteCouponHandler: async (couponId: string): Promise<boolean> => {
        const success = await couponService.deleteCouponById(couponId);
        return success;
    },

    createCouponHandler: async (data: any) => {
        const newCoupon = await couponService.createCoupon(data);
        return newCoupon;
    },
    updateCouponStatusHandler: async (couponId: string, status: string): Promise<boolean> => {
        const success = await couponService.updateCouponStatusById(couponId, status); 
        return success;
    },
    updateCouponDetailHandler: async (couponId: string, data: UpdateCouponDto): Promise<boolean> => {
        const success = await couponService.updateCouponById(couponId, data); 
        return success;
    },

    //products-management
    getAllProductsHandler: async (queryParams: any = {}) => {
        const filter: any = {};
        
        if (queryParams.q) {
            const searchRegex = new RegExp(queryParams.q, 'i');
            filter.$or = [
                { name: searchRegex },
            ];
        }
        if (queryParams.categoryId) filter.categoryId = queryParams.categoryId;
        if (queryParams.brandId) filter.brandId = queryParams.brandId; 

        const products = await productService.getProductsForAdmin(filter); 
        return products;
    },

    getProductByIdHandler: async (productId: string) => {
        const productDetail = await productService.getProductDetailForAdmin(productId); 
        return productDetail;
    },

    createProductHandler: expressAsyncHandler(async (req: Request, res: Response) => {
        const productData: CreateProductRequest = req.body;
        const product = await productService.createProduct(productData);
        res.status(201).json({ success: true, message: "Sản phẩm đã được tạo thành công.", product });
    }),
};

export default adminController;