import { get } from "mongoose";
import { orderDao } from "../daos/Order.dao.js";
import { orderItemDao } from '../daos/OrderItem.dao.js';
import { variantDao } from "../daos/Variant.dao.js";
import { CreateOrderDto } from "../dto/Create.dto.js";
import { CreateOrderRequest } from '../dto/Request.dto.js';
import ApiError from "../utils/ApiError.js";
import { OrderStatus } from "../utils/OrderStatus.enum.js";
import { OrderQuery, Pagination } from "../utils/Pagination.js";
import { statusHistoryDao } from './../daos/StatusHistory.dao.js';

const orderService = {
    createOrder: async (data: CreateOrderRequest) => {
        let totalPrice = 0;
        let totalDiscount = 0;
        let totalPay = 0;
        const orderItems = await Promise.all(data.variants.map(async (item) => {
            const variant = await variantDao.readById(item.variantId);
            if (variant === null) {
                throw new ApiError(404, "Not Found", `Variant with ID ${item.variantId} not found`);
            }

            totalPrice += variant.price * item.quantity;
            const discountAmount = variant.price * variant.discount / 100;
            totalDiscount += item.quantity * discountAmount;
            const orderItem = await orderItemDao.create({
                variantId: item.variantId,
                quantity: item.quantity,
                price: variant.price,
                discount: discountAmount,
            });
            return orderItem;
        }));
        totalPay = totalPrice - totalDiscount;
        const orderData: CreateOrderDto = {
            userId: data.userId,
            couponId: data.couponId || null,
            shippingMethod: data.shippingMethod,
            paymentMethod: data.paymentMethod,
            totalPrice,
            totalDiscount,
            totalPay,
        };
        const order = await orderDao.create(orderData);
        await statusHistoryDao.create({
            orderId: order._id.toString(),
            status: OrderStatus.PENDING
        });
        orderItems.forEach(async (item) => {
            orderItemDao.patchById(item._id.toString(), {
                orderId: order._id
            })
        });
        return order;

    },

    getAllOrders: async () => {
        return orderDao.list();
    },

    getOrdersByQuery: async (query: OrderQuery) => {

        const filter: {
            userId?: string;
            currentStatus?: string;
        } = {};

        if (query.userId) filter.userId = query.userId;
        if (query.status) filter.currentStatus = query.status;

        const page = parseInt((query.page || "1"), 10);
        const limit = parseInt((query.limit || "10"), 10);
        const sortBy = query.sortBy || "updatedAt";
        const sortOrder = query.sortOrder === "desc" ? -1 : 1;

        const options = {
            skip: (page - 1) * limit,
            limit: limit,
            sort: { [sortBy]: sortOrder },
        }
        const data = await orderDao.findBy(filter, options);
        const totalDatas = await orderDao.count(filter);
        return new Pagination(data, page, limit, totalDatas);
    },

    getOrderById: async (id: string) => {
        const order = await orderDao.readById(id);
        if (!order) {
            throw new ApiError(404, "Not Found", "Order not found");
        }
        return order;
    },

    getOrderByUserId: async (userId: string) => {
        return orderDao.findBy({ userId }, { sort: { orderDate: -1 } });
    },

    //DELETE
    deleteOrderById: async (id: string) => {
        return orderDao.deleteById(id);
    },


    //UPDATE
    updateStatusById: async (id: string, status: string) => {
        const validStatuses = Object.values(OrderStatus).map(s => s.toString());
        if (!validStatuses.includes(status)) {
            throw new ApiError(400, "Bad Request", `Invalid status. Valid statuses are: ${validStatuses.join(", ")}`);
        }

        const order = await orderDao.readById(id);
        if (!order) {
            throw new ApiError(404, "Not Found", "Order not found");
        }

        await statusHistoryDao.create({
            orderId: id,
            status: status
        });
        const updated = await orderDao.patchById(id, { currentStatus: status });
        return updated;
    }

};
export default orderService;
