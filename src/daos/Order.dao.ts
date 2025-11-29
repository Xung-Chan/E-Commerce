import mongoose, { InferSchemaType, QueryOptions, Schema } from "mongoose";
import { CreateOrderDto } from "../dto/Create.dto.js";
import CRUD from "../utils/CRUD.interface.js";
import { WithId } from "../utils/WithId.js";
import { OrderStatus } from "../utils/OrderStatus.enum.js";
const OrderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
    },

    totalPrice: {
        type: Number,
        required: true
    },
    totalDiscount: {
        type: Number,
        required: true

    },
    totalPay: {
        type: Number,
        required: true

    },
    shippingFee: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        default: 0
    },
    shippingMethod: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    currentStatus: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.PENDING
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
const Order = mongoose.model("Order", OrderSchema)
class OrderDao implements CRUD {

    async patchById(id: string, part: Partial<any>): Promise<boolean> {
        const result = await Order.updateOne({ _id: id }, { $set: part });
        return result.modifiedCount > 0;
    }

    async findBy(query: Partial<any>, options: QueryOptions = {}): Promise<IOrder[]> {
        const orders = await Order.find({
            ...query,
            deletedAt: null
        }, null, options).exec();
        return orders.map(order => order.toObject() as IOrder);
    }

    async create(item: CreateOrderDto): Promise<IOrder> {
        const order = await Order.create(item);
        return order.toObject() as IOrder;
    }

    async readById(id: string): Promise<IOrder | null> {
        const order = await Order.findById(id).exec();
        return order ? order.toObject() as IOrder : null;
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await Order.updateOne({ _id: id }, { $set: { deletedAt: new Date() } });
        return result.modifiedCount > 0;
    }

    async list(): Promise<any[]> {
        return await Order.find().exec();
    }

    async count(query: Partial<any>): Promise<number> {
        return await Order.countDocuments({ ...query, deletedAt: null }).exec();
    }

    async sumRevenue(interval: { start: Date; end: Date } | null = null): Promise<number> {
        let filter = {};
        if (interval) {
            filter = {
                updatedAt: { $gte: interval.start, $lte: interval.end }
            };
        }
        const result = await Order.aggregate([
            {
                $match: {
                    ...filter,
                    currentStatus: { $eq: OrderStatus.DELIVERED },

                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: { $subtract: ["$totalPay", "$shippingFee"] } }
                }
            }
        ]).exec();

        if (result.length === 0) {
            return 0;
        }

        return result[0].totalRevenue;
    }

    async countOrders(interval: { start: Date; end: Date } | null = null): Promise<number> {
        let filter = {};
        if (interval) {
            filter = {
                updatedAt: { $gte: interval.start, $lte: interval.end }
            };
        }
        return await Order.countDocuments({ ...filter, deletedAt: null }).exec();
    }
}
export const orderDao = new OrderDao();
export type IOrder = WithId<InferSchemaType<typeof OrderSchema>> & { createdAt: Date, updatedAt: Date };