import mongoose, { Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface";
const CatalogSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
}, { versionKey: false })
const Catalog = mongoose.model("Catalog", CatalogSchema)
class CatalogDao implements CRUD {
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Catalog.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>): Promise<any | null> {
        return Catalog.find(query).exec();
    }
    async create(item: {
        name: string,
        description: string
    }): Promise<any> {
        const catalog = Catalog.create(item);
        return await catalog;
    }
    async readById(id: string): Promise<any | null> {
        return Catalog.findById(id).exec();
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await Catalog.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async list(): Promise<any[]> {

        return Catalog.find().exec();
    }

}
export default new CatalogDao();