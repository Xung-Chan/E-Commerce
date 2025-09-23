import mongoose, { InferSchemaType, QueryOptions, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { CreateOrderDto } from "../dto/Create.dto.js";
import { UpdateOrderDto } from "../dto/Update.dto.js";
const OrderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    products: {
        type: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            variantId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            price: Number,
            discount: Number
        }]
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
    currentStatus: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "canceled"],
        default: "pending"
    },
    statusHistories: {
        type: [
            {
                status: {
                    type: String,
                    enum: ["pending", "processing", "shipped", "delivered", "canceled"],
                    required: true
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        default: [{
            status: "pending",
            date: Date.now()
        }],
        required: true
    }

})

const Order = mongoose.model("Order", OrderSchema)
class OrderDao implements CRUD {
    async patchById(id: string, item: UpdateOrderDto): Promise<boolean> {
        const result = await Order.updateOne({ _id: id }, { $set: item });
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
export type IOrder = InferSchemaType<typeof OrderSchema>;