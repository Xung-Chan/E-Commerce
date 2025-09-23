import { orderDao } from "../daos/Order.dao.js";
import { productDao } from "../daos/Product.dao.js";
import { CreateOrderDto } from "../dto/Create.dto";
import ApiError from "../utils/ApiError";
import { OrderStatus } from "../utils/OrderStatus.enum.js";

const orderService = {
    createOrder: async (data: CreateOrderDto) => {
        let totalPrice = 0;
        let totalDiscount = 0;
        let totalPay = 0;
        for (const item of data.products) {
            const product = await productDao.readById(item.productId);
            if (product === null) {
                throw new ApiError(404, "Not Found", `Product with ID ${item.productId} not found`);
            }
            const variant = product.variants.id(item.variantId);
            if (variant === null) {
                throw new ApiError(404, "Not Found", `Variant with ID ${item.variantId} not found`);
            }
            totalPrice += variant.price * item.quantity;
            totalDiscount += item.quantity * variant.price * product.discount / 100;
        }
        totalPay = totalPrice - totalDiscount;
        data.totalPrice = totalPrice;
        data.totalDiscount = totalDiscount;
        data.totalPay = totalPay;
        return orderDao.create(data);
    },


    //GET
    getAllOrders: async () => {
        return orderDao.list();
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
        const statusHistories = order.statusHistories.map(s => s.status.toString());
        if (statusHistories.includes(status)) {
            throw new ApiError(400, "Bad Request", `Order is already in status ${status}`);
        }


        const data = {
            currentStatus: status,
            statusHistories: [{ status, date: new Date() }, ...order.statusHistories]
        };
        return orderDao.patchById(id, data);
    }
};
export default orderService;
