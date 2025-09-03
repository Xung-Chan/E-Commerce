import mongoose from "mongoose";
import { Schema } from "mongoose";
const User = new Schema({
    email: {
        type: String,
        require: true
    },
    fullName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    addresses: {
        type: [String],
        require: true
    },
    cart: [{
            productId: String,
            quantity: Number
        }],
    status: {
        type: String,
        enum: ["active", "inactive", "banned"],
        default: "active"
    }
}, { versionKey: false });
export default mongoose.model("User", User);
//# sourceMappingURL=User.js.map