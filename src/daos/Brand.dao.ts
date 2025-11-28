import mongoose, { InferSchemaType, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { CreateBrandDto } from "../dto/Create.dto.js";
import { WithId } from "../utils/WithId.js";


const BrandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }

}, { versionKey: false })
const Brand = mongoose.model("Brand", BrandSchema);
class BrandDao implements CRUD {
    async findBy(query: Partial<any>): Promise<any | null> {
        return Brand.find({
            ...query,
            deletedAt: null
        }).exec();
    }
    async create(data: CreateBrandDto) {
        console.log(data);
        const brand = await Brand.create(data);
        return brand;
    }
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Brand.updateOne({ _id: id, deletedAt: null }, { $set: item });
        return result.modifiedCount > 0;
    }
    async readById(id: string): Promise<any | null> {
        return Brand.findById(id).exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await Brand.updateOne({ _id: id, deletedAt: null }, { $set: { deletedAt: new Date() } });
        return result.modifiedCount > 0;
    }
    async list(): Promise<any[]> {
        return Brand.find().exec();
    }

}
export const brandDao = new BrandDao();
export type IBrand = WithId<InferSchemaType<typeof BrandSchema>>;