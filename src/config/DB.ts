import mongoose from "mongoose";
import "dotenv/config";
export const connect = async (): Promise<mongoose.Mongoose> => {
    const con = await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Database connected...")
    return con;
}
