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
    async create(data: { name: string, description: string }) {
        const brand = await Brand.create(data);
        console.log(brand);
        return !!brand
    }
    async readById(id: string): Promise<any | null> {
        throw new Error("Method not implemented.");
    }
    updateById(id: string, item: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

}
export default new BrandDao();