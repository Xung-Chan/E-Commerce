import mongoose, { InferSchemaType, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { CreateCategoryDto } from "../dto/Create.dto.js";
const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    landingPageDisplay: {
        type: Boolean,
        default: false
    },
}, { versionKey: false })

const Category = mongoose.model("Category", CategorySchema)
class CategoryDao implements CRUD {
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Category.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>): Promise<any | null> {
        return Category.find(query).exec();
    }
    async create(item: CreateCategoryDto): Promise<any> {
        const category = Category.create(item);
        return await category;
    }
    async readById(id: string): Promise<any | null> {
        return Category.findById(id).exec();
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await Category.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async list(): Promise<any[]> {

        return Category.find().exec();
    }

}
export const categoryDao = new CategoryDao();
export type ICategory = InferSchemaType<typeof CategorySchema> & { _id: mongoose.Types.ObjectId };