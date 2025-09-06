import mongoose, { Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface";
const RattingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    rate: {
        type: Number,
        require: true,
        min: 1,
        max: 5
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const Ratting = mongoose.model("Ratting", RattingSchema)
class RattingDao implements CRUD {
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
export default new RattingDao();
