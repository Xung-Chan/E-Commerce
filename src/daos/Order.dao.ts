import mongoose, { InferSchemaType, QueryOptions, Schema } from "mongoose";
import { CreateOrderDto } from "../dto/Create.dto.js";
import CRUD from "../utils/CRUD.interface.js";
import { WithId } from "../utils/WithId.js";
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
    shippingMethod: {
        type: String,
        enum: ["standard", "express"],
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["credit", "cash_on_delivery"],
        required: true
    },
    currentStatus: {
        type: String,
        enum: ["pending", "processed", "delivered", "completed", "canceled"],
        default: "pending"
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createdAt' },
})
const Order = mongoose.model("Order", OrderSchema)
class OrderDao implements CRUD {

    async patchById(id: string, part: Partial<any>): Promise<boolean> {
        const result = await Order.updateOne({ _id: id }, { $set: part });
        return result.modifiedCount > 0;
    }

    async findBy(query: Partial<any>, options: QueryOptions = {}): Promise<any | null> {
        return await Order.find({
            ...query,
            deletedAt: null
        }, null, options).exec();
    }

    async create(item: CreateOrderDto): Promise<IOrder> {
        return await Order.create(item);
    }

    async readById(id: string): Promise<IOrder | null> {
        return await Order.findById(id).exec();
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
                createdAt: { $gte: interval.start, $lte: interval.end }
            };
        }
        const result = await Order.aggregate([
            {
                $match: {
                    ...filter,
                    status: { $ne: "completed" },

                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPay" }
                }
            }
        ]).exec();
        return result[0]?.totalRevenue || 0;
    }
}
export const orderDao = new OrderDao();
export type IOrder = WithId<InferSchemaType<typeof OrderSchema>>;