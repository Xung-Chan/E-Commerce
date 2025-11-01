import mongoose, { InferSchemaType, QueryOptions, Schema } from "mongoose";
import { CreateOrderDto } from "../dto/Create.dto.js";
import CRUD from "../utils/CRUD.interface.js";
import { WithId } from "../utils/WithId.js";
import e from "express";
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
        enum: ["pending", "processing", "delivered", "shipped", "canceled"],
        default: "pending"
    },

}, {
    versionKey: false,
    timestamps: { createdAt: 'createdAt' }
})

const Order = mongoose.model("Order", OrderSchema)
class OrderDao implements CRUD {
    async patchById(id: string, part: Partial<any>): Promise<boolean> {
        const result = await Order.updateOne({ _id: id }, { $set: part });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>, options: QueryOptions = {}): Promise<any | null> {
        return await Order.find(query, null, options).exec();
    }
    async create(item: CreateOrderDto): Promise<IOrder> {
        return await Order.create(item);
    }
    async readById(id: string): Promise<IOrder | null> {
        return await Order.findById(id).exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await Order.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async list(): Promise<any[]> {
        return await Order.find().exec();
    }
}
export const orderDao = new OrderDao();
export type IOrder = WithId<InferSchemaType<typeof OrderSchema>>;