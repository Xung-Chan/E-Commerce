import { orderDao } from "../daos/Order.dao.js";
import { CreateOrderDto } from "../dto/Create.dto";
import ApiError from "../utils/ApiError";

const orderService = {
    createOrder: async (data: CreateOrderDto) => {
        let totalPrice = 0;
        let totalDiscount = 0;
        let taxe = 0;
        let totalPay = 0;
        data.products.forEach(item => {
            totalPrice += item.price * item.quantity;
            totalDiscount += item.discount * item.quantity;
        });
        taxe = (totalPrice - totalDiscount) * 0.1;
        totalPay = totalPrice - totalDiscount + taxe;
        data.totalPrice = totalPrice;
        data.totalDiscount = totalDiscount;
        data.taxe = taxe;
        data.totalPay = totalPay;
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
