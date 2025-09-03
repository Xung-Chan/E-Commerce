import mongoose, { Schema } from "mongoose";
const Catalog = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
}, { versionKey: false })

export default mongoose.model("Catalog", Catalog)