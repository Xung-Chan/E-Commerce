import mongoose, { Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface";
const OrderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    products: {
        type: [{
            productId: mongoose.Schema.Types.ObjectId,
            quantity: {
                type: Number,
                require: true,
                min: 1
            },
            price: Number,
            discount: Number
        }]
    },

    totalPrice: {
        type: Number,
        require: true
    },
    totalDiscount: {
        type: Number,
        require: true

    },
    taxe: {
        type: Number,
        default: 0

    },
    totalPay: {
        type: Number,
        require: true

    },

    currentStatus: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending"
    },
    statusHistories: {
        type: [
            {
                status: {
                    type: String,
                    enum: ["pending", "shipped", "delivered"],
                    require: true
                },
                date: {
                    type: Date,
                    require: true
                }
            }
        ], default: [{
            status: "Pending",
            date: Date.now()
        }]
    }

})
const Order = mongoose.model("Order", OrderSchema)
class OrderDao implements CRUD {
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Order.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>): Promise<any | null> {
        return await Order.find(query).exec();
    }
    async create(item: {
        userId: string,
        products: { productId: string, quantity: number, price: number, discount: number }[],
        totalPrice: number,
        totalDiscount: number,
        taxe: number,
        totalPay: number,
    }): Promise<any> {
        return await Order.create(item);
    }
    async readById(id: string): Promise<any | null> {
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
export default new OrderDao();
