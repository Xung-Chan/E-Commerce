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
import statisticsService, { StatisticPeriod } from "../services/Statistics.service.js";

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

    getDashboard: expressAsyncHandler(async (req: Request, res: Response) => {
        const statistics = await statisticsService.getSimpleStatistic();
        res.render("admin/dashboard", {
            title: "Dashboard",
            layout: "admin",
            totalUsers: statistics.totalUsers,
            totalOrders: statistics.totalOrders,
            newUsers: statistics.newUsers,
            revenue: statistics.revenue,
            profit: statistics.profit,
            topProducts: statistics.topProducts,
            accumulatedRevenue: statistics.accumulatedRevenue,
            accumulatedProfit: statistics.accumulatedProfit
        });
    }),

    getProductByIdHandler: async (productId: string) => {
        const productDetail = await productService.getProductDetailForAdmin(productId);
        return productDetail;
    },

    createProductHandler: expressAsyncHandler(async (req: Request, res: Response) => {
        const productData: CreateProductRequest = req.body;
        const product = await productService.createProduct(productData);
        res.status(201).json({ success: true, message: "Sản phẩm đã được tạo thành công.", product });
    }),


    getSimpleStatisticsHandler: expressAsyncHandler(async (req: Request, res: Response) => {
        const statistics = await statisticsService.getSimpleStatistic();

        res.status(200).json(new ApiResponse(true, 200, "Lấy thống kê nâng cao thành công", statistics));
        // return res.render("admin/statistic", {
        //     accumulatedRevenue: statistics.accumulatedRevenue,
        //     accumulatedProfit: statistics.accumulatedProfit,
        //     totalUsers: statistics.totalUsers,
        //     newUsers: statistics.newUsers,
        //     totalOrders: statistics.totalOrders,
        //     revenue: statistics.revenue,
        //     topProducts: statistics.topProducts,
        //     layout: "admin"
        // })
    }),

    renderAdvancedStatisticsPage: expressAsyncHandler(async (req: Request, res: Response) => {
        const query = req.query;
        const period = query.period as string || StatisticPeriod.NEAREST_30_DAYS
        let interval: {
            startDate: Date,
            endDate: Date
        } | null = null;

        if (query.startDate && query.endDate) {
            interval = {
                startDate: new Date(query.startDate as string),
                endDate: new Date(query.endDate as string)
            }
        }

        const statistics = await statisticsService.getAdvancedStatistic(period, interval);

        res.render("admin/advanced-statistic", {
            layout: "admin",
            title: "Thống kê nâng cao",
            revenue: statistics.revenues,
            profit: statistics.profits,
            orders: statistics.orders,
            totalProfit: statistics.totalProfit,
        })
    },),

    getAdvancedStatisticsHandler: expressAsyncHandler(async (req: Request, res: Response) => {
        const query = req.query;
        const period = query.period as string || StatisticPeriod.NEAREST_30_DAYS
        let interval: {
            startDate: Date,
            endDate: Date
        } | null = null;
        if (query.startDate && query.endDate) {
            interval = {
                startDate: new Date(query.startDate as string),
                endDate: new Date(query.endDate as string)
            }
        }
        const statistics = await statisticsService.getAdvancedStatistic(period, interval);
        res.status(200).json(new ApiResponse(true, 200, "Lấy thống kê nâng cao thành công", statistics));
    })
}

export default adminController;