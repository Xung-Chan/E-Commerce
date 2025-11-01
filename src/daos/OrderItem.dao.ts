import mongoose, { InferSchemaType, Schema } from "mongoose";
import { CreateOrderItemDto } from "../dto/Create.dto.js";
import { WithId } from "../utils/WithId.js";
const OrderItemSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
    },
    variantId: {
        type: Schema.Types.ObjectId,
        ref: "Variant",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    }

}, {
    versionKey: false, timestamps: {
        createdAt: 'createdAt'
    }
});
const OrderItem = mongoose.model("OrderItem", OrderItemSchema);
class OrderItemDao {
    async create(data: CreateOrderItemDto): Promise<IOrderItem> {
        return OrderItem.create(data);
    }
    async readById(id: string): Promise<IOrderItem | null> {
        return OrderItem.findById(id).exec();
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await OrderItem.deleteOne({ _id: id })
        return result.deletedCount > 0;
    }
    async findBy(query: Partial<any>): Promise<IOrderItem[] | null> {
        return OrderItem.find(query).exec();
    }
    async findOne(query: Partial<any>): Promise<IOrderItem | null> {
        return OrderItem.findOne(query).exec();

    }
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await OrderItem.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
}
export const orderItemDao = new OrderItemDao();
export type IOrderItem = WithId<InferSchemaType<typeof OrderItemSchema>>;