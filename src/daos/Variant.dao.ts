import mongoose, { InferSchemaType, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { CreateVariantDto } from "../dto/Create.dto.js";
import { WithId } from "../utils/WithId.js";
const VariantSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    distinctFeature: {
        type: String,
        required: true,
        unique: true,
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }

}, {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
const Variant = mongoose.model("Variant", VariantSchema);
class VariantDao implements CRUD {
    async findBy(query: Partial<any>): Promise<any | null> {
        return Variant.find(query).exec();
    }
    async create(data: CreateVariantDto) {
        const variant = await Variant.create(data);
        return variant;
    }
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Variant.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
    async readById(id: string): Promise<IVariant | null> {
        return Variant.findById(id).exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await Variant.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async list(): Promise<any[]> {
        return Variant.find().exec();
    }

}
export const variantDao = new VariantDao();
export type IVariant = WithId<InferSchemaType<typeof VariantSchema>>;