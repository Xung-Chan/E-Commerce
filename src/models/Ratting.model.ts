import mongoose, { Schema } from "mongoose";
const Ratting = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    rate: {
        type: Number,
        require: true,
        min: 1,
        max: 5
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

export default mongoose.model("Ratting", Ratting)