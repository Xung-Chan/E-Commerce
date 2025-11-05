import mongoose, { InferSchemaType, Query, QueryOptions, Schema } from "mongoose";
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
            required: true,
            min: 1
        },
        maxUse: {
            type: Number,
            required: true,
            min: 1
        },
        used: {
            type: Number,
            required: true,
            default: 0
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },
        orders: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            }],
            default: []
        },
        deletedAt: {
            type: Date,
            default: null
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
            _id: id,
            deletedAt: null
        }, { $set: item });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>, options: QueryOptions = {}): Promise<ICoupon[]> {
        return Coupon.find({
            ...query,
            deletedAt: null
        }, null, options).exec();
    }
    async findOneBy(query: Partial<any>): Promise<ICoupon | null> {
        return await Coupon.findOne({
            ...query,
            deletedAt: null
        }).exec();
    }
    async create(item: CreateCouponDto): Promise<any> {
        return await Coupon.create(item);
    }
    async readById(id: string): Promise<ICoupon | null> {
        return await Coupon.findById(id).exec();
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await Coupon.updateOne({ _id: id, deletedAt: null }, { $set: { deletedAt: new Date() } });
        return result.modifiedCount > 0;
    }
    async list(): Promise<any[]> {
        return await Coupon.find().exec();
    }

    async count(query: Partial<any>): Promise<number> {
        return await Coupon.countDocuments({
            ...query,
            deletedAt: null
        }).exec();
    }

}
export const couponDao = new CouponDao();
export type ICoupon = WithId<InferSchemaType<typeof CouponSchema>>;