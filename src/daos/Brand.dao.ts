import mongoose, { Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
const BrandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

}, { versionKey: false })

const Brand = mongoose.model("Brand", BrandSchema);
class BrandDao implements CRUD {
    async findBy(query: Partial<any>): Promise<any | null> {
        return Brand.find(query).exec();
    }
    async create(data: { name: string, description: string }) {
        const brand = await Brand.create(data);
        console.log(brand);
        return !!brand
    }
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Brand.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
    async readById(id: string): Promise<any | null> {
        return Brand.findById(id).exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await Brand.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async list(): Promise<any[]> {
        return Brand.find().exec();
    }

}
export default new BrandDao();