import mongoose, { Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface";
const CouponSchema = new Schema({
    code: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    didcount: {
        type: Number,
        require: true
    },
    used: {
        type: Number,
        require: true
    },
    maxUse: {
        type: Number,
        require: true
    },
    orders: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        }],
        default: []
    }

})
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
    async create(item: {
        code: string,
        didcount: number,
        used: number,
        maxUse: number,
    }): Promise<any> {
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
export default new CouponDao();