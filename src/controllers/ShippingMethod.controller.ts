import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import ApiResponse from "../utils/Api.response.js";
import shippingMethodService from "../services/ShippingMethod.service.js";
import ApiError from "../utils/ApiError.js";


const shippingMethodController = {

    createShippingMethod: expressAsyncHandler(async (req: Request, res: Response) => {
        const { name, description, price } = req.body;
        const shippingMethod = await shippingMethodService.createShippingMethod({ name, description, price });
        res.status(201).json(new ApiResponse(true, 201, "Shipping method created successfully", shippingMethod));
    }),
    getAllShippingMethods: expressAsyncHandler(async (req: Request, res: Response) => {
        const shippingMethods = await shippingMethodService.getAllShippingMethods();
        res.status(200).json(new ApiResponse(true, 200, "Shipping methods retrieved successfully", shippingMethods));
    }),

    getShippingMethodByName: expressAsyncHandler(async (req: Request, res: Response) => {
        const { name } = req.params;
        if (!name) {
            res.status(400).json(new ApiError(400, "Name parameter is missing", "Tên phương thức vận chuyển bị thiếu"));
            return;
        }
        const shippingMethod = await shippingMethodService.getShippingMethodByName(name);
        res.status(200).json(new ApiResponse(true, 200, "Shipping method retrieved successfully", shippingMethod));
    })
}
export default shippingMethodController; 