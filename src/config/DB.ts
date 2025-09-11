import mongoose from "mongoose";
import "dotenv/config";
export const connect = async (): Promise<mongoose.Mongoose> => {

    let url = process.env.DATABASE_URL as string;
    console.log("Connecting to database at:", url);
    const con = await mongoose.connect(url);
    console.log("Database connected....")
    return con;
}
