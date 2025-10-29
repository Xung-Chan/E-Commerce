import mongoose, { InferSchemaType, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { CreateCouponDto } from "../dto/Create.dto.js";
import { WithId } from "../utils/WithId.js";
const CouponSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        discount: {
            type: Number,
            required: true
        },
        maxUse: {
            type: Number,
            required: true
        },
        used: {
            type: Number,
            required: true,
            default: 0
        },
        orders: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            }],
            default: []
        }

    },
    {
        versionKey: false,
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);

const Coupon = mongoose.model("Coupon", CouponSchema)
class CouponDao implements CRUD {
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Coupon.updateOne({
            _id: id
        }, { $set: item });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>): Promise<any | null> {
        return Coupon.find(query).exec();
    }
    async create(item: CreateCouponDto): Promise<any> {
        return await Coupon.create(item);
    }
    async readById(id: string): Promise<any | null> {
        return await Coupon.findById(id).exec();
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await Coupon.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async list(): Promise<any[]> {
        return await Coupon.find().exec();
    }

}
export const couponDao = new CouponDao();
export type ICoupon = WithId<InferSchemaType<typeof CouponSchema>>;