import mongoose, { InferSchemaType, QueryOptions, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { CreateProductDto } from "../dto/Create.dto.js";
import SortOption from "../utils/SortOption.js";
import { WithId } from "../utils/WithId.js";
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    soldCount: {
        type: Number,
        default: 0
    },
    averageRate: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

const Product = mongoose.model("Product", ProductSchema)
class ProductDao implements CRUD {
    async create(item: CreateProductDto): Promise<any> {
        return await Product.create(item);
    }
    async list(): Promise<any[]> {
        return await Product.find().lean().exec();
    }
    async findBy(query: Partial<any>, option: QueryOptions = {}): Promise<IProduct[]> {
        return await Product.find({ ...query, deletedAt: null }, null, option).lean().exec();
    }
    async count(query: Partial<any>): Promise<number> {
        return await Product.countDocuments({ ...query, deletedAt: null }).lean().exec();
    }
    async readById(id: string): Promise<IProduct | null> {
        return await Product.findById(id).lean().exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await Product.updateOne({ _id: id, deletedAt: null }, { $set: { deletedAt: new Date() } });
        return result.modifiedCount > 0;
    }
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Product.updateOne({ _id: id, deletedAt: null }, { $set: item });
        return result.modifiedCount > 0;
    }
}
export const productDao = new ProductDao();
export type IProduct = WithId<InferSchemaType<typeof ProductSchema>>;