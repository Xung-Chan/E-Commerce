import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { create } from 'express-handlebars';
import { CreateOrderDto } from '../dto/Create.dto';
import orderService from '../services/Order.service';
import ApiResponse from '../utils/Api.response';
import ApiError from '../utils/ApiError';
const orderController = {
    createOrder: expressAsyncHandler(async (req: Request, res: Response) => {
        const data: CreateOrderDto = req.body;
        if (!data.userId) {
            throw new ApiError(400, "Bad Request", "User ID is required");
        }
        if (!data.products) {
            throw new ApiError(400, "Bad Request", "Products are required");
        }
        const order = await orderService.createOrder(data);
        res.status(201).json(new ApiResponse(true, 201, "Order created successfully", order));
    }),
    getAllOrders: expressAsyncHandler(async (req: Request, res: Response) => {
        const orders = await orderService.getAllOrders();
        res.status(200).json(new ApiResponse(true, 200, "Orders fetched successfully", orders));
    }),
    getOrderById: expressAsyncHandler(async (req: Request, res: Response) => {
        const orderId = req.params.orderId;
        if (!orderId) {
            throw new ApiError(400, "Bad Request", "Order ID is required");
        }
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            throw new ApiError(404, "Not Found", "Order not found");
        }
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
    })

}
export default orderController;