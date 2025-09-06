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
export default new CatalogDao();