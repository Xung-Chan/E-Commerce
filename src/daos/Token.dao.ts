import mongoose, { InferSchemaType, Schema } from "mongoose";

const TokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isUsed: {
        type: Boolean,
        default: false
    }
}, { versionKey: false })

const Token = mongoose.model("Token", TokenSchema)
class TokenDao {
    async create(item: { userId: string, token: string }): Promise<any> {
        const token = Token.create({
            userId: item.userId,
            token: item.token
        });
    }
    async patchById(id: string, item: Partial<any>): Promise<boolean> {
        const result = await Token.updateOne({ _id: id }, { $set: item });
        return result.modifiedCount > 0;
    }
    async findBy(query: Partial<any>): Promise<any | null> {
        return await Token.findOne(query);
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await Token.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
}
export const tokenDao = new TokenDao();
export type IToken = InferSchemaType<typeof TokenSchema>;