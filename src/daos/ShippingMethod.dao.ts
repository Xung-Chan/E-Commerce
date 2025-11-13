import mongoose, { InferSchemaType, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { WithId } from "../utils/WithId.js";
const ShippingMethodSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdAt'
    }
})
const ShippingMethod = mongoose.model("shipping_method", ShippingMethodSchema)
class ShippingMethodDao {
    async create(item: {
        name: string,
        description?: string,
        price: number
    }): Promise<IShippingMethod> {
        return await ShippingMethod.create(item);
    }
    async list(): Promise<IShippingMethod[]> {
        return await ShippingMethod.find().exec();
    }
    async readById(id: string): Promise<IShippingMethod | null> {
        return await ShippingMethod.findById(id).exec();
    }
    async readByName(name: string): Promise<IShippingMethod | null> {
        return await ShippingMethod.findOne({ name: name }).exec();
    }
}


export const shippingMethodDao = new ShippingMethodDao();
export type IShippingMethod = WithId<InferSchemaType<typeof ShippingMethodSchema>>;