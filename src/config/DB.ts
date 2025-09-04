import mongoose from "mongoose";
export const connect = async (): Promise<mongoose.Mongoose> => {
    const con = await mongoose.connect("mongodb://localhost:27018/e_commerce")
    console.log("Database connected...")
    return con;
}
