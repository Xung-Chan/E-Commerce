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
import { CreateProductRequest, UpdateProductRequest } from "../dto/Request.dto.js";
import { UPLOAD_DIR } from "../services/Image.service.js";
import categoryService from "../services/Category.service.js";

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
        const sortOptions: any = {};

        const page = parseInt(queryParams.page) || 1;
        const limit = parseInt(queryParams.limit) || 10;

        if (queryParams.q) {
            const searchRegex = new RegExp(queryParams.q, 'i');
            filter.$or = [
                { name: searchRegex },
                { _id: queryParams.q.length === 24 ? queryParams.q : undefined }
            ].filter(item => item !== undefined); 
            
            if (filter.$or.length === 0) {
                filter.$or = [{ name: searchRegex }];
            }
        }
        
        if (queryParams.categoryId) filter.categoryId = queryParams.categoryId;
        if (queryParams.brandId) filter.brandId = queryParams.brandId;
        
        if (queryParams.sortPrice) {
            if (queryParams.sortPrice === 'minPrice_asc') {
                sortOptions.minPrice = 1;
            } else if (queryParams.sortPrice === 'minPrice_desc') {
                sortOptions.minPrice = -1;
            }
        }
        const allProducts = await productService.getProductsForAdmin(filter, sortOptions, queryParams.sortStock);
        
        const totalProducts = allProducts.length;
        const totalPages = Math.ceil(totalProducts / limit);
        
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const products = allProducts.slice(startIndex, endIndex);

        return {
            products: products,
            totalProducts: totalProducts,
            totalPages: totalPages,
            currentPage: page,
            limit: limit,
            query: queryParams 
        };
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
        const uploadedFiles = (req as any).files as Express.Multer.File[]; 
        
        if (!uploadedFiles || uploadedFiles.length === 0) {
            throw new ApiError(400, "Bad Request", "Sản phẩm phải có ít nhất một hình ảnh.");
        }
        
        productData.images = uploadedFiles.map(file => UPLOAD_DIR + file.filename); 

        await productService.createProduct(productData);
        
        res.redirect("/admin/products"); 
    }),
    updateProductHandler: expressAsyncHandler(async (req: Request, res: Response) => {
        const productId = req.params.id!;
        const updateData: UpdateProductRequest = req.body;
        
        const newUploadedFiles = (req as any).files as Express.Multer.File[] || [];
        
        
        
        if (newUploadedFiles && newUploadedFiles.length > 0) {
            const newImagePaths = newUploadedFiles.map(file => UPLOAD_DIR + file.filename);
            updateData.images = newImagePaths;
            

        } else {
            
            let existingImages: string[] = [];
            const requestBody = req.body as any;
            
            if (requestBody.existingImagesPlaceholder) {
                if (Array.isArray(requestBody.existingImagesPlaceholder)) {
                    existingImages = requestBody.existingImagesPlaceholder as string[];
                } else {
                    existingImages = [requestBody.existingImagesPlaceholder as string];
                }
            }
            
            updateData.images = existingImages;
        }

        const success = await productService.updateProductById(productId, updateData);

        if (success) {
            res.redirect(`/admin/products/${productId}`);
        } else {
            throw new ApiError(400, "Bad Request", "Không tìm thấy sản phẩm hoặc lỗi cập nhật.");
        }
    }),

    deleteProductHandler: async (productId: string): Promise<boolean> => {
        const deletedProduct = await productService.deleteProductByIdAdmin(productId);
        return !!deletedProduct;
    },


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
            title: "Statistics",
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
    }),

    getOrdersManagementPage: expressAsyncHandler(async (req: Request, res: Response) => {
        const query = req.query;

        const orders = await orderService.getOrdersByQuery(query);
        const { page = '1', limit = '10', status = '', sortBy = 'updatedAt', sortOrder = 'desc' } = (req.query || {}) as any;

        const filteredQuery: Record<string, string> = {};
        Object.entries({ status, sortBy, sortOrder, limit }).forEach(([k, v]) => {
            if (v !== undefined && v !== null && String(v) !== '') filteredQuery[k] = String(v);
        });
        const baseQueryString = Object.entries(filteredQuery)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join('&');
        const pages = Array.from({ length: orders.totalPages }, (_, i) => ({
            number: i + 1,
            active: i + 1 === orders.page
        }));
        res.render("admin/orders-management", {
            layout: "admin",
            title: "Quản lý đơn hàng",
            query: query,
            orders: orders.datas,
            hasPrevPage: orders.hasPrevPage,
            hasNextPage: orders.hasNextPage,
            prevPage: orders.prevPage,
            nextPage: orders.nextPage,
            pages: pages,
            baseQueryString: baseQueryString
        });
    }),

    getOrderDetailHandler: async (orderId: string) => {
        const order = await orderService.getOrderById(orderId);
        return order;
    },

    updateOrderStatusHandler: async (orderId: string, status: string) => {
        const success = await orderService.updateStatusById(orderId, status);
        return success;
    },

    
    //categories-management
    getAllCategoriesHandler: async () => {
        const categories = await categoryService.getAllCategories();
        return categories;
    },

    createCategoryHandler: async (data: any, imagePath?: string) => {
        if (imagePath) {
            data.image = imagePath;
        }
        // Chuyển đổi landingPageDisplay thành boolean
        data.landingPageDisplay = data.landingPageDisplay === 'true' || data.landingPageDisplay === true;
        const newCategory = await categoryService.createCategory(data);
        return newCategory;
    },

    updateCategoryHandler: async (categoryId: string, data: any, imagePath?: string) => {
        if (imagePath) {
            data.image = imagePath;
        }
        // Chuyển đổi landingPageDisplay thành boolean
        data.landingPageDisplay = data.landingPageDisplay === 'true' || data.landingPageDisplay === true;
        const success = await categoryService.updateCategoryById(categoryId, data);
        return success;
    },

    deleteCategoryHandler: async (categoryId: string) => {
        const success = await categoryService.deleteCategoryById(categoryId);
        return success;
    }
}

export default adminController;