import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/Api.response.js';
import { OrderQuery } from '../utils/Pagination.js';
import orderService from '../services/Order.service.js';
import { CreateOrderRequest } from '../dto/Request.dto.js';
import { ErrorDictionary } from '../middleware/errorDictionary.js';
import { createOrder } from '../middleware/validate.js';


const orderController = {
    createOrder: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        if (!userId) {
            throw new ApiError(401, "Unauthorized", "No token provided");
        }
        const {
            variants,
            shippingMethodId,
            couponId,
            isUseUserPoint,
            address
        } = req.body;

        const errors = createOrder.validate({
            userId,
            variants,
            shippingMethodId,
            couponId,
            isUseUserPoint,
            address
        }, { abortEarly: false }).error;
        if (errors) {
            throw new ApiError(400, "Bad Request", errors.details.map(detail => detail.message).join(", "));
        }
        const order = await orderService.createOrder({ address, isUseUserPoint, userId, variants, shippingMethodId, couponId });
        res.status(201).json(new ApiResponse(true, 201, "Order created successfully", order));
    }),


    //* Admin only
    searchOrder: expressAsyncHandler(async (req: Request, res: Response) => {
        const query: OrderQuery = req.query;
        console.log(query);
        const orders = await orderService.getOrdersByQuery(query);
        res.status(200).json(new ApiResponse(true, 200, "Orders fetched successfully", orders));
    }),

    getOrderById: expressAsyncHandler(async (req: Request, res: Response) => {
        const orderId = req.params.orderId;
        if (!orderId) {
            throw new ApiError(400, "Bad Request", "Order ID is required");
        }
        const order = await orderService.getOrderById(orderId);
        res.status(200).json(new ApiResponse(true, 200, "Order fetched successfully", order));
    }),


    deleteOrderById: expressAsyncHandler(async (req: Request, res: Response) => {
        const orderId = req.params.orderId;
        if (!orderId) {
            throw new ApiError(400, "Bad Request", "Order ID is required");
        }
        await orderService.deleteOrderById(orderId);
        res.status(200).json(new ApiResponse(true, 200, "Order deleted successfully", null));
    }),

    updateStatusById: expressAsyncHandler(async (req: Request, res: Response) => {
        const orderId = req.params.orderId;
        const { status } = req.body;
        if (!orderId) {
            throw new ApiError(400, "Bad Request", "Order ID is required");
        }
        if (!status) {
            throw new ApiError(400, "Bad Request", "Status is required");
        }
        const updatedOrder = await orderService.updateStatusById(orderId, status);
        res.status(200).json(new ApiResponse(true, 200, "Order status updated successfully", updatedOrder));
    }),

    //* User only
    getMyOrders: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        if (!userId) {
            throw new ApiError(401, "Unauthorized", ErrorDictionary.UNAUTHORIZED);
        }
        const orders = await orderService.getOrdersByQuery({ userId });
        res.status(200).json(new ApiResponse(true, 200, "Orders fetched successfully", orders));
    }),


}
export default orderController;