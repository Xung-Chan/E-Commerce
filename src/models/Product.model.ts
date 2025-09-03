import mongoose, { Schema } from "mongoose";
const Product = new Schema({
    name: {
        type: String, require: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        require: true
    },
    catalogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catalog",
        require: true
    },
    description: {
        type: String,
        require: true
    },
    images: {
        type: [String],
        require: true
    },
    variants: {
        type: [
            {
                diffTitle: String,
                price: Number,
                stock: Number
            }],
        require: true

    }
}, { versionKey: false })
export default mongoose.model("Product", Product)