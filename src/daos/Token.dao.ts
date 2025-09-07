import mongoose, { Schema } from "mongoose";

const TokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    token: {
        type: String,
        require: true
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
}
export default new TokenDao();