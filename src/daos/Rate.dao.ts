import mongoose, { InferSchemaType, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
const RateSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })
RateSchema.index({ userId: 1, productId: 1 }, { unique: true });
const Rate = mongoose.model("Rate", RateSchema)
class RateDao implements CRUD {
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Rate.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>): Promise<any | null> {
        return await Rate.find(query).exec();
    }
    async create(item: {
        userId: string,
        rate: number
    }): Promise<any> {
        return await Rate.create(item);
    }
    async readById(id: string): Promise<any | null> {
        return await Rate.findById(id).exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await Rate.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async list(): Promise<any[]> {
        return await Rate.find().exec();
    }
}
export const rateDao = new RateDao();
export type IRate = InferSchemaType<typeof RateSchema>;