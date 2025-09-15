import { CreateOrderDto } from "../dto/Create.dto";
import orderDao from "../daos/Order.dao.js";
import { get } from "mongoose";
import ApiError from "../utils/ApiError";

const orderService = {
    //CREATE
    createOrder: async (data: CreateOrderDto) => {
        return orderDao.create(data);
    },


    //GET
    getAllOrders: async () => {
        return orderDao.list();
    },
    getOrderById: async (id: string) => {
        return orderDao.readById(id);
    },
    getOrderByUserId: async (userId: string) => {
        return orderDao.findBy({ userId });
    },

    //DELETE
    deleteOrderById: async (id: string) => {
        return orderDao.deleteById(id);
    },


    //UPDATE
    updateStatusById: async (id: string, status: string) => {
        const order = await orderDao.readById(id);
        if (!order) {
            throw new ApiError(404, "Not Found", "Order not found");
        }
        const data = {
            currentStatus: status,
            statusHistories: [...order.statusHistories, { status }]
        }
        return orderDao.patchById(id, data);
    }
};
export default orderService;
