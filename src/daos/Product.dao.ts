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
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Product.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>): Promise<any | null> {
        return Product.find(query).exec();
    }
    async create(item: {
        name: string,
        brandId: string,
        catalogId: string,
        description: string,
        images: string[],
        variants: { diffTitle: string, price: number, stock: number }[]

    }): Promise<any> {
        return await Product.create(item);
    }
    async readById(id: string): Promise<any | null> {
        return await Product.findById(id).exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await Product.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async list(): Promise<any[]> {
        return await Product.find().exec();
    }
}
export default new ProductDao();
