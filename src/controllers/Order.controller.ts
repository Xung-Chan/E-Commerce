import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/Api.response.js';
import { OrderQuery } from '../utils/Pagination.js';
import orderService from '../services/Order.service.js';
import { CreateOrderRequest } from '../dto/Request.dto.js';
import { ErrorDictionary } from '../middleware/errorDictionary.js';


const orderController = {
    createOrder: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        if (!userId) {
            throw new ApiError(401, "Unauthorized", "No token provided");
        }
        const data: CreateOrderRequest = req.body;
        data.userId = userId;
        if (!data.variants || data.variants.length === 0) {
            throw new ApiError(400, "Bad Request", "Variants are required");
        }
        const order = await orderService.createOrder(data);
        res.status(201).json(new ApiResponse(true, 201, "Order created successfully", order));
    }),

    getAllOrders: expressAsyncHandler(async (req: Request, res: Response) => {
        const orders = await orderService.getAllOrders();
        res.status(200).json(new ApiResponse(true, 200, "Orders fetched successfully", orders));
    }),

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

    getOrderByUserId: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.userId;
        if (!userId) {
            throw new ApiError(400, "Bad Request", "User ID is required");
        }
        const orders = await orderService.getOrderByUserId(userId);
        res.status(200).json(new ApiResponse(true, 200, "Orders fetched successfully", orders));
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

    getMyOrders: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        if (!userId) {
            throw new ApiError(401, "Unauthorized", ErrorDictionary.UNAUTHORIZED);
        }
        const orders = await orderService.getOrderByUserId(userId);
        res.status(200).json(new ApiResponse(true, 200, "Orders fetched successfully", orders));
    }),


}
export default orderController;