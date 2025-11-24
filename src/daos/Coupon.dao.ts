import mongoose, { InferSchemaType, Query, QueryOptions, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { CreateCouponDto } from "../dto/Create.dto.js";
import { WithId } from "../utils/WithId.js";
import { CouponDto } from "../dto/Dto.js";

export enum CouponStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

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
            min: 1,
            max: 50
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
            enum: [CouponStatus.ACTIVE, CouponStatus.INACTIVE],
            default: CouponStatus.ACTIVE
        },
        userIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        }],
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


    async create(item: CreateCouponDto): Promise<ICoupon> {
        const doc = await Coupon.create(item);
        return doc.toObject() as ICoupon;
    }

    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Coupon.updateOne({
            _id: id,
            deletedAt: null
        }, { $set: item });
        return result.modifiedCount > 0;
    }

    async findBy(query: Partial<any>, options: QueryOptions = {}): Promise<ICoupon[]> {
        const coupons = await Coupon.find({
            ...query,
            deletedAt: null
        }, null, options).exec();

        return coupons.map(coupon => coupon.toObject() as ICoupon);
    }

    async findOneBy(query: Partial<any>): Promise<ICoupon | null> {
        const coupon = await Coupon.findOne({
            ...query,
            deletedAt: null
        }).exec();
        return coupon ? coupon.toObject() as ICoupon : null;
    }


    async readById(id: string): Promise<ICoupon | null> {
        const coupon = await Coupon.findById(id).exec();
        return coupon ? coupon.toObject() as ICoupon : null;
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
export type ICoupon = WithId<InferSchemaType<typeof CouponSchema>> & { createdAt: Date, updatedAt: Date };