import mongoose, { Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface";
const ProductSchema = new Schema({
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
const Product = mongoose.model("Product", ProductSchema)
class ProductDao implements CRUD {
    patchById(id: string, item: Partial<any>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findBy(query: Partial<any>): Promise<any | null> {
        throw new Error("Method not implemented.");
    }
    create(item: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    readById(id: string): Promise<any | null> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
}
export default new ProductDao();
