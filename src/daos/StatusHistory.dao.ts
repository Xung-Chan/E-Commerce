import { create } from 'express-handlebars';
import mongoose, { InferSchemaType, QueryOptions, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { WithId } from "../utils/WithId.js";
import { OrderStatus } from "../utils/OrderStatus.enum.js";
const StatusHistorySchema = new Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        required: true
    },

}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdAt'
    }
})
const StatusHistory = mongoose.model("status_history", StatusHistorySchema)
class StatusHistoryDao implements CRUD {
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await StatusHistory.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>, options: QueryOptions = {}): Promise<IStatusHistory[]> {
        const sh = await StatusHistory.find(query, null, options).exec();
        return sh.map(s => s.toObject() as IStatusHistory);
    }
    async create(item: {
        orderId: string,
        status: string
    }): Promise<any> {
        return await StatusHistory.create(item);
    }
    async readById(id: string): Promise<any | null> {
        return await StatusHistory.findById(id).exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await StatusHistory.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async list(): Promise<any[]> {
        return await StatusHistory.find().exec();
    }
}
export const statusHistoryDao = new StatusHistoryDao();
export type IStatusHistory = WithId<InferSchemaType<typeof StatusHistorySchema>> & { createdAt: Date };