import mongoose, { InferSchemaType, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { CreateCommentDto } from "../dto/Create.dto.js";
import { WithId } from "../utils/WithId.js";
const CommentSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    fullName: {
        type: String,
        default: "Anonymous"
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

    deletedAt: {
        type: Date,
        default: null
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdAt'
    }
})

const Comment = mongoose.model("Comment", CommentSchema);
class CommentDao implements CRUD {

    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Comment.updateOne({ _id: id, deletedAt: null }, { $set: item });
        return result.modifiedCount > 0;
    }

    async findBy(query: Partial<any>): Promise<IComment[]> {
        return Comment.find({
            ...query,
            deletedAt: null
        }).exec();
    }

    async create(item: CreateCommentDto): Promise<any> {
        return await Comment.create(item);
    }

    async readById(id: string): Promise<any | null> {
        return Comment.findById(id).exec();
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await Comment.updateOne({ _id: id, deletedAt: null }, { $set: { deletedAt: new Date() } });
        return result.modifiedCount > 0;
    }

    async list(): Promise<IComment[]> {
        return Comment.find().exec();
    }
}
export const commentDao = new CommentDao();
export type IComment = WithId<InferSchemaType<typeof CommentSchema>>;