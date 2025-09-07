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
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Ratting.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>): Promise<any | null> {
        return await Ratting.find(query).exec();
    }
    async create(item: {
        userId: string,
        rate: number
    }): Promise<any> {
        return await Ratting.create(item);
    }
    async readById(id: string): Promise<any | null> {
        return await Ratting.findById(id).exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await Ratting.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async list(): Promise<any[]> {
        return await Ratting.find().exec();
    }
}
export default new RattingDao();
