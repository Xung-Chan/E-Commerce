import expressAsyncHandler from "express-async-handler";
import { create } from "express-handlebars";
import { CreateCouponDto } from "../dto/Create.dto";
import { Request, Response } from "express";
import couponService from "../services/Coupon.service";
import ApiResponse from "../utils/Api.response";
import ApiError from "../utils/ApiError";
const couponController = {
    createCoupon: expressAsyncHandler(async (req: Request, res: Response) => {
        const data: CreateCouponDto = req.body;
        const coupon = await couponService.createCoupon(data);
        res.status(201).json(new ApiResponse(true, 201, "Coupon created successfully", coupon));
    }),
    getAllCoupons: expressAsyncHandler(async (req: Request, res: Response) => {
        const coupons = await couponService.getAllCoupons();
        res.status(200).json(new ApiResponse(true, 200, "Coupons fetched successfully", coupons));
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
    deleteCouponById: expressAsyncHandler(async (req: Request, res: Response) => {
        const couponId = req.params.couponId;
        if (!couponId) {
            throw new ApiError(400, "Bad Request", "Coupon ID is required");
        }
        await couponService.deleteCouponById(couponId);
        res.status(200).json(new ApiResponse(true, 200, "Coupon deleted successfully", null));
    })
};
export default couponController;