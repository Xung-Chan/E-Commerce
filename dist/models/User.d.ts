import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    addresses: string[];
    cart: mongoose.Types.DocumentArray<{
        productId?: string | null;
        quantity?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        productId?: string | null;
        quantity?: number | null;
    }> & {
        productId?: string | null;
        quantity?: number | null;
    }>;
    status: "active" | "inactive" | "banned";
    email?: string | null;
    fullName?: string | null;
    password?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    addresses: string[];
    cart: mongoose.Types.DocumentArray<{
        productId?: string | null;
        quantity?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        productId?: string | null;
        quantity?: number | null;
    }> & {
        productId?: string | null;
        quantity?: number | null;
    }>;
    status: "active" | "inactive" | "banned";
    email?: string | null;
    fullName?: string | null;
    password?: string | null;
}, {}, {
    versionKey: false;
}> & {
    addresses: string[];
    cart: mongoose.Types.DocumentArray<{
        productId?: string | null;
        quantity?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        productId?: string | null;
        quantity?: number | null;
    }> & {
        productId?: string | null;
        quantity?: number | null;
    }>;
    status: "active" | "inactive" | "banned";
    email?: string | null;
    fullName?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    addresses: string[];
    cart: mongoose.Types.DocumentArray<{
        productId?: string | null;
        quantity?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        productId?: string | null;
        quantity?: number | null;
    }> & {
        productId?: string | null;
        quantity?: number | null;
    }>;
    status: "active" | "inactive" | "banned";
    email?: string | null;
    fullName?: string | null;
    password?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    addresses: string[];
    cart: mongoose.Types.DocumentArray<{
        productId?: string | null;
        quantity?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        productId?: string | null;
        quantity?: number | null;
    }> & {
        productId?: string | null;
        quantity?: number | null;
    }>;
    status: "active" | "inactive" | "banned";
    email?: string | null;
    fullName?: string | null;
    password?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    versionKey: false;
}>> & mongoose.FlatRecord<{
    addresses: string[];
    cart: mongoose.Types.DocumentArray<{
        productId?: string | null;
        quantity?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        productId?: string | null;
        quantity?: number | null;
    }> & {
        productId?: string | null;
        quantity?: number | null;
    }>;
    status: "active" | "inactive" | "banned";
    email?: string | null;
    fullName?: string | null;
    password?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
//# sourceMappingURL=User.d.ts.map