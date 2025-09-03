import mongoose, { Schema } from "mongoose";
const Coupon = new Schema({
    code: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
export default mongoose.model("Coupon", Coupon)