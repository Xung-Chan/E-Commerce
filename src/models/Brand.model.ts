import mongoose, { Schema } from "mongoose";
const Brand = new Schema({
    name: {
        type: String,
        require: true
    },
    desciption: {
        type: String,
        require: true
    }

}, { versionKey: false })
export default mongoose.model("Brand", Brand)