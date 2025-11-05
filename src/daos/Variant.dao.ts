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
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        min: 0,
        max: 50,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
    , deletedAt: {
        type: Date,
        default: null
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
const Variant = mongoose.model("Variant", VariantSchema);
class VariantDao implements CRUD {
    async findBy(query: Partial<any>): Promise<IVariant[]> {
        return Variant.find({ ...query, deletedAt: null }).exec();
    }
    async create(data: CreateVariantDto): Promise<IVariant> {
        const variant = await Variant.create(data);
        return variant;
    }
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Variant.updateOne({ _id: id, deletedAt: null }, { $set: item });
        return result.modifiedCount > 0;
    }
    async readById(id: string): Promise<IVariant | null> {
        return Variant.findById(id).exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await Variant.updateOne({ _id: id, deletedAt: null }, { $set: { deletedAt: new Date() } });
        return result.modifiedCount > 0;
    }
    async list(): Promise<any[]> {
        return Variant.find({ deletedAt: null }).exec();
    }

}
export const variantDao = new VariantDao();
export type IVariant = WithId<InferSchemaType<typeof VariantSchema>>;