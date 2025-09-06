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
        ]
    }

})
const Order = mongoose.model("Order", OrderSchema)
class OrderDao implements CRUD {
    create(item: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    readById(id: string): Promise<any | null> {
        throw new Error("Method not implemented.");
    }
    updateById(id: string, item: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
}
export default new OrderDao();
