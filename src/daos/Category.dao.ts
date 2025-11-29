import mongoose, { InferSchemaType, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { CreateCategoryDto } from "../dto/Create.dto.js";
import { WithId } from "../utils/WithId.js";
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
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdAt', updatedAt: 'updatedAt'
    }
});

const Category = mongoose.model("Category", CategorySchema)
class CategoryDao implements CRUD {
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Category.updateOne({ _id: id, deletedAt: null }, { $set: item });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>): Promise<any | null> {
        return Category.find({
            ...query,
            deletedAt: null
        }).lean().exec();
    }
    async create(item: CreateCategoryDto): Promise<any> {
        const category = Category.create(item);
        return await category;
    }
    async readById(id: string): Promise<any | null> {
        return Category.findById(id).lean().exec();
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await Category.updateOne({ _id: id }, { $set: { deletedAt: new Date() } });
        return result.modifiedCount > 0;
    }
    async list(): Promise<any[]> {
        return Category.find({ deletedAt: null }).lean().exec();
    }

}
export const categoryDao = new CategoryDao();
export type ICategory = WithId<InferSchemaType<typeof CategorySchema>>;