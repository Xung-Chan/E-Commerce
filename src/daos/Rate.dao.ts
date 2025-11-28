import { create } from 'express-handlebars';
import mongoose, { InferSchemaType, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { WithId } from "../utils/WithId.js";
import { CreateRateDto } from "../dto/Create.dto.js";
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
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
RateSchema.index({ userId: 1, productId: 1 }, { unique: true });
const Rate = mongoose.model("Rate", RateSchema)
class RateDao implements CRUD {
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Rate.updateOne({ _id: id, deletedAt: null }, { $set: item });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>): Promise<IRate[]> {
        const rates = await Rate.find({ ...query, deletedAt: null }).exec();
        return rates.map(rate => rate.toObject() as IRate);
    }

    async findOneBy(query: Partial<any>): Promise<IRate | null> {
        const rate = await Rate.findOne({ ...query, deletedAt: null }).exec();
        return rate?.toObject() as IRate || null;
    }
    async create(item: CreateRateDto): Promise<any> {
        return await Rate.create(item);
    }
    async readById(id: string): Promise<any | null> {
        return await Rate.findById(id).exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await Rate.updateOne({ _id: id, deletedAt: null }, { $set: { deletedAt: new Date() } });
        return result.modifiedCount > 0;
    }
    async list(): Promise<any[]> {
        return await Rate.find().exec();
    }
}
export const rateDao = new RateDao();
export type IRate = WithId<InferSchemaType<typeof RateSchema>> & { createdAt: Date, updatedAt: Date };