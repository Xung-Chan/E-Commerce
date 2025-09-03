import mongoose from "mongoose";
import User from "../models/User.js";
export const connect = async () => {
    await mongoose.connect("mongodb://localhost:27017/e_commerce")
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log("MongoDB connection error:", err));
};
//# sourceMappingURL=DB.js.map