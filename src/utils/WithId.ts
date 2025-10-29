import { mongo } from "mongoose";

export type WithId<T> = T & { _id: mongo.ObjectId };