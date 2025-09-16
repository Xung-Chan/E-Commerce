import mongoose, { Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { CreateProductDto } from "../dto/Create.dto.js";
import SortOption from "../utils/SortOption.js";
const ProductSchema = new Schema({
    name: {
        type: String, require: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
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
    soldCount: {
        type: Number,
        default: 0
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    discount: {
        type: Number,
        min: 0,
        max: 50,
        default: 0
    },
    variants: {
        type: [
            {
                distinctFeature: String,
                price: Number,
                stock: Number
            }],
        require: true

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const Product = mongoose.model("Product", ProductSchema)
class ProductDao implements CRUD {
    async create(item: CreateProductDto): Promise<any> {
        return await Product.create(item);
    }
    async list(): Promise<any[]> {
        return await Product.find().exec();
    }
    async sortBy(sortOption: SortOption): Promise<any[]> {
        return await Product.find().sort(sortOption.toQuery()).exec();
    }
    async findBy(query: Partial<any>): Promise<any | null> {
        return Product.find(query).exec();
    }
    async readById(id: string): Promise<any | null> {
        return await Product.findById(id).exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await Product.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Product.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
}
export default new ProductDao();
