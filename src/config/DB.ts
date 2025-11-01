import mongoose from "mongoose";
import "dotenv/config";
export const connect = async (): Promise<mongoose.Mongoose> => {
    const DB_NAME = process.env.DB_NAME || "e_commerce";
    let url = `mongodb://mongodb:27017/${DB_NAME}`;
    console.log("Connecting to database at:", url);
    const con = await mongoose.connect(url);
    console.log("Database connected....")
    return con;
}