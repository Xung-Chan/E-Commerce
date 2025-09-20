import mongoose, { InferSchemaType, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { CreateCommentDto } from "../dto/Create.dto.js";
const CommentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    fullName: {
        type: String,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const Comment = mongoose.model("Comment", CommentSchema);
class CommentDao implements CRUD {
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Comment.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>): Promise<any | null> {
        return Comment.find(query).exec();
    }
    async create(item: CreateCommentDto): Promise<any> {
        return await Comment.create(item);
    }
    async readById(id: string): Promise<any | null> {
        return Comment.findById(id).exec();
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await Comment.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    async list(): Promise<any[]> {
        return Comment.find().exec();
    }
}
export const commentDao = new CommentDao();
export type IComment = InferSchemaType<typeof CommentSchema>;