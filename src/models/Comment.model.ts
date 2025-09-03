import mongoose, { Schema } from "mongoose";
const Comment = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    content: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

export default mongoose.model("Comment", Comment)