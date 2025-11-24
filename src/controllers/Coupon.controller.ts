import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import { CreateCouponDto } from "../dto/Create.dto.js";
import couponService from "../services/Coupon.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";
import { get } from "mongoose";
import { CouponQuery } from "../utils/Pagination.js";

const couponController = {

    createCoupon: expressAsyncHandler(async (req: Request, res: Response) => {
        const data: CreateCouponDto = req.body;
        const coupon = await couponService.createCoupon(data);
        res.status(201).json(new ApiResponse(true, 201, "Coupon created successfully", coupon));
    }),

    getCouponById: expressAsyncHandler(async (req: Request, res: Response) => {
        const couponId = req.params.couponId;
        if (!couponId) {
            throw new ApiError(400, "Bad Request", "Coupon ID is required");
        }
        const coupon = await couponService.getCouponById(couponId);
        if (!coupon) {
            throw new ApiError(404, "Not Found", "Coupon not found");
        }
        res.status(200).json(new ApiResponse(true, 200, "Coupon fetched successfully", coupon));
    }),

    // getAllCoupons: expressAsyncHandler(async (req: Request, res: Response) => {
    //     const coupons = await couponService.getAllCoupons();
    //     res.status(200).json(new ApiResponse(true, 200, "Coupons fetched successfully", coupons));
    // }),


    deleteCouponById: expressAsyncHandler(async (req: Request, res: Response) => {
        const couponId = req.params.couponId;
        if (!couponId) {
            throw new ApiError(400, "Bad Request", "Coupon ID is required");
        }
        await couponService.deleteCouponById(couponId);
        res.status(200).json(new ApiResponse(true, 200, "Coupon deleted successfully", null));
    }),

    getCouponByCode: expressAsyncHandler(async (req: Request, res: Response) => {
        const couponCode = req.query.code as string;
        if (!couponCode) {
            throw new ApiError(400, "Bad Request", "Coupon code is required");
        }
        const coupon = await couponService.getCouponByCode(couponCode);
        if (!coupon) {
            throw new ApiError(404, "Not Found", "Không tìm thấy mã giảm giá");
        }
        res.status(200).json(new ApiResponse(true, 200, "Coupon fetched successfully", coupon));
    }),

    getCouponByQuery: expressAsyncHandler(async (req: Request, res: Response) => {
        const query: CouponQuery = req.query;
        const coupons = await couponService.getCouponByQuery(query);
        res.status(200).json(new ApiResponse(true, 200, "Coupons fetched successfully", coupons));
    })

};
export default couponController;