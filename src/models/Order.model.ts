import mongoose, { Schema } from "mongoose";
const Order = new Schema({
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
export default mongoose.model("Order", Order)