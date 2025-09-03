import mongoose from "mongoose";
export const connect = async (): Promise<void> => {
    mongoose.connect("mongodb://localhost:27018/e_commerce")
}
