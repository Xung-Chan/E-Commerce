import mongoose, { InferSchemaType, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface";
import { CreateCartItemDto } from "../dto/Create.dto";
import { WithId } from "../utils/WithId";

const CartItemSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    variantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },

}, {
    versionKey: false, timestamps: {
        createdAt: 'createdAt', updatedAt: 'updatedAt'
    }
});
const CartItem = mongoose.model("CartItem", CartItemSchema);
class CartItemDao {
    async create(data: CreateCartItemDto): Promise<ICartItem> {
        return CartItem.create(data);
    }
    async readById(id: string): Promise<ICartItem | null> {
        return CartItem.findById(id).exec();
    }
    async updateById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await CartItem.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await CartItem.deleteOne({ _id: id })
        return result.deletedCount > 0;
    }
    async findBy(query: Partial<any>): Promise<ICartItem[] | null> {
        return CartItem.find(query).exec();
    }
    async findOne(query: Partial<any>): Promise<ICartItem | null> {
        return CartItem.findOne(query).exec();
    }
}
export const cartItemDao = new CartItemDao();
export type ICartItem = WithId<InferSchemaType<typeof CartItemSchema>>;