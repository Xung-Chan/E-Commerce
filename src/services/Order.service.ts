import { cartItemDao } from "../daos/CartItem.dao.js";
import { orderDao } from "../daos/Order.dao.js";
import { orderItemDao } from '../daos/OrderItem.dao.js';
import { userDao } from "../daos/User.dao.js";
import { variantDao } from "../daos/Variant.dao.js";
import { CreateOrderDto } from "../dto/Create.dto.js";
import { CreateOrderRequest } from '../dto/Request.dto.js';
import { DetailOrderResponse, OutlineOrderResponse } from "../dto/Response.dto.js";
import { ErrorDictionary } from "../middleware/errorDictionary.js";
import ApiError from "../utils/ApiError.js";
import { OrderStatus } from "../utils/OrderStatus.enum.js";
import { OrderQuery, Pagination } from "../utils/Pagination.js";
import { statusHistoryDao } from './../daos/StatusHistory.dao.js';
import couponService from "./Coupon.service.js";
import { sendMail } from "./Mail.service.js";
import productService from "./Product.service.js";
import shippingMethodService from "./ShippingMethod.service.js";

class OrderService {
    async createOrder(data: CreateOrderRequest) {
        let totalPrice = 0;
        let totalDiscount = 0;
        let totalPay = 0;

        const user = await userDao.readById(data.userId);
        if (!user) {
            throw new ApiError(404, "Not Found", ErrorDictionary.USER_NOT_FOUND);
        }

        const shipping = await shippingMethodService.getShippingMethodById(data.shippingMethodId);
        if (!shipping) {
            throw new ApiError(404, "Not Found", ErrorDictionary.SHIPPING_METHOD_NOT_FOUND);
        }


        const orderItems = await Promise.all(data.variants.map(async (item) => {


            const variant = await variantDao.readById(item.variantId);
            if (variant === null) {
                throw new ApiError(404, "Not Found", ErrorDictionary.VARIANT_NOT_FOUND);
            }
            if (variant.stock < item.quantity) {
                throw new ApiError(400, "Bad Request", "Sản phẩm không đủ số lượng trong kho");
            }

            const product = await productService.getProductById(variant.productId.toString());
            totalPrice += variant.price * item.quantity;
            const discountAmount = variant.price * product.discount / 100;
            totalDiscount += item.quantity * discountAmount;
            console.log("Discount Amount:", discountAmount);

            await variantDao.patchById(variant._id.toString(), {
                stock: variant.stock - item.quantity
            });

            const existingCartItem = await cartItemDao.findOne({
                userId: data.userId,
                variantId: item.variantId
            });
            if (existingCartItem) {
                await cartItemDao.deleteById(existingCartItem._id.toString());
            }


            const orderItem = await orderItemDao.create({
                variantId: item.variantId,
                quantity: item.quantity,
                price: variant.price,
                discount: discountAmount,
            });
            return {
                ...orderItem, productName: product.name,
                variant: variant.distinctFeature

            };
        }));

        if (data.couponId) {
            const coupon = await couponService.getCouponById(data.couponId);
            if (!coupon) {
                throw new ApiError(404, "Not Found", "Coupon not found");
            }
            if (coupon.status !== "active") {
                throw new ApiError(400, "Bad Request", "Coupon is not active");
            }
            await couponService.useCoupon(coupon._id.toString(), data.userId);
            const discountAmount = coupon.discount * totalPrice / 100;
            totalDiscount += discountAmount;
            totalPay -= discountAmount;
        }

        if (data.isUseUserPoint) {
            const pointPrice = user.point * 1000;

            if (pointPrice >= totalPay) {
                const usedPoints = Math.floor(totalPay / 1000);
                totalPay = 0;
                totalDiscount += usedPoints * 1000;
                await userDao.patchById(user._id.toString(), { point: user.point - usedPoints });
            } else {
                totalPay -= pointPrice;
                totalDiscount += pointPrice;
                await userDao.patchById(user._id.toString(), { point: 0 });
            }
        }
        totalPay = totalPrice - totalDiscount + shipping.price;

        const tax = totalPrice * 0.1; // 10% tax
        totalPay += tax;

        const orderData: CreateOrderDto = {
            userId: data.userId,
            couponId: data.couponId || null,
            shippingMethod: shipping.name,
            totalPrice,
            totalDiscount,
            shippingFee: shipping.price,
            totalPay,
            tax,
            address: data.address
        };

        const order = await orderDao.create(orderData);

        await statusHistoryDao.create({
            orderId: order._id.toString(),
            status: OrderStatus.PENDING
        });

        await Promise.all(orderItems.map(async (item) => {
            await orderItemDao.patchById(item._id.toString(), {
                orderId: order._id
            })
        }));

        sendMail(
            user.email,
            "",
            "order", {
            dateOrder: order.createdAt,
            orderId: order._id.toString(),
            receiver: user.fullName,
            address: data.address,
            items: orderItems.map(item => ({
                productName: item.productName,
                variant: item.variant,
                quantity: item.quantity,
                itemPrice: item.price
            })),
            totalPrice: order.totalPrice,
            shippingFee: order.shippingFee,
            discount: order.totalDiscount,
            totalPay: order.totalPay
        }
        )

        return order;

    }


    async getOrdersByQuery(query: OrderQuery): Promise<Pagination<OutlineOrderResponse>> {

        const filter: {
            userId?: string;
            currentStatus?: string;
        } = {};

        if (query.userId) filter.userId = query.userId;

        const page = parseInt((query.page || "1"), 10);
        const limit = parseInt((query.limit || "10"), 10);
        const sortBy = query.sortBy || "updatedAt";
        const sortOrder = query.sortOrder === "asc" ? 1 : -1;

        const options = {
            skip: (page - 1) * limit,
            limit: limit,
            sort: { [sortBy]: sortOrder },
        }
        const totalDatas = await orderDao.count(filter);
        const orders = await orderDao.findBy(filter, options);
        const data: OutlineOrderResponse[] = await Promise.all(orders.map(async (order) => {
            const user = await userDao.readById(order.userId.toString());
            if (!user) {
                throw new ApiError(404, "Not Found", ErrorDictionary.USER_NOT_FOUND);
            }

            const orderItems = await orderItemDao.findBy({ orderId: order._id.toString() });
            const items = await Promise.all(orderItems.map(async (item) => {
                const variant = await variantDao.readById(item.variantId.toString());
                if (!variant) {
                    throw new ApiError(404, "Not Found", ErrorDictionary.VARIANT_NOT_FOUND);
                }
                const product = await productService.getProductById(variant.productId.toString());
                return {
                    productName: product.name,
                    distinctFeature: variant.distinctFeature,
                    quantity: item.quantity,
                    price: item.price,
                }
            }));
            return {
                id: order._id.toString(),
                userId: order.userId.toString(),
                fullName: user.fullName,
                totalPrice: order.totalPrice,
                items: items,
                currentStatus: order.currentStatus
            }
        }))


        return new Pagination<OutlineOrderResponse>(data, page, limit, totalDatas);
    }

    async getOrderById(id: string): Promise<DetailOrderResponse> {
        const order = await orderDao.readById(id);
        if (!order) {
            throw new ApiError(404, "Not Found", ErrorDictionary.ORDER_NOT_FOUND);
        }

        const user = await userDao.readById(order.userId.toString());
        if (!user) {
            throw new ApiError(404, "Not Found", ErrorDictionary.USER_NOT_FOUND);
        }

        const statusHistories = await statusHistoryDao.findBy({ orderId: id }, { sort: { createdAt: -1 } });
        const orderItems = await orderItemDao.findBy({ orderId: id });
        const orderItemInfos = await Promise.all(orderItems.map(async (item) => {
            const variant = await variantDao.readById(item.variantId.toString());
            if (!variant) {
                throw new ApiError(404, "Not Found", ErrorDictionary.VARIANT_NOT_FOUND);
            }
            const product = await productService.getProductById(variant.productId.toString());
            if (!product) {
                throw new ApiError(404, "Not Found", ErrorDictionary.PRODUCT_NOT_FOUND);
            }

            return {
                productName: product.name,
                distinctFeature: variant.distinctFeature,
                quantity: item.quantity,
                price: item.price,
            };

        }))


        const result: DetailOrderResponse = {
            id: order._id.toString(),
            userId: order.userId.toString(),
            fullName: user.fullName,
            email: user.email,
            address: order.address,
            status: statusHistories.map(sh => ({
                status: sh.status,
                createdAt: sh.createdAt
            })),
            items: orderItemInfos,
            totalPrice: order.totalPrice,
            totalDiscount: order.totalDiscount,
            shippingFee: order.shippingFee,
            totalPay: order.totalPay,
            shippingMethod: order.shippingMethod
        };

        return result;
    }

    //DELETE
    async deleteOrderById(id: string) {
        const order = await orderDao.readById(id);
        if (!order) {
            throw new ApiError(404, "Not Found", ErrorDictionary.ORDER_NOT_FOUND);
        }
        return orderDao.deleteById(id);
    }


    //UPDATE
    async updateStatusById(id: string, status: string) {
        const validStatuses = Object.values(OrderStatus).map(s => s.toString());
        if (!validStatuses.includes(status)) {
            throw new ApiError(400, "Bad Request", ErrorDictionary.STATUS_INVALID);
        }

        const order = await orderDao.readById(id);
        if (!order) {
            throw new ApiError(404, "Not Found", ErrorDictionary.ORDER_NOT_FOUND);
        }

        await statusHistoryDao.create({
            orderId: id,
            status: status
        });
        const updated = await orderDao.patchById(id, { currentStatus: status });
        return updated;
    }

    async getRevenue() {
        const totalRevenue = await orderDao.sumRevenue();
        return totalRevenue;
    }

};
const orderService = new OrderService();
export default orderService;
