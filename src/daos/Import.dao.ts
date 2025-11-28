import { create } from 'express-handlebars';
import mongoose, { InferSchemaType, Schema } from "mongoose";
import CRUD from "../utils/CRUD.interface.js";
import { CreateBrandDto, CreateImportDto } from "../dto/Create.dto.js";
import { WithId } from "../utils/WithId.js";
import { OrderStatus } from '../utils/OrderStatus.enum.js';


const ImportSchema = new Schema({
    variantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variant",
    },

    quantity: {
        type: Number,
        required: true,
        min: 0
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },


}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdAt'
    }
})

const Import = mongoose.model("Import", ImportSchema);
class ImportDao {

    async findBy(query: Partial<any>): Promise<IImport[]> {
        const imports = await Import.find({
            ...query,
            deletedAt: null
        }).exec();
        return imports.map(imp => imp.toObject() as IImport);
    }


    async create(data: CreateImportDto): Promise<IImport> {
        const importRecord = await Import.create(data);
        return importRecord.toObject() as IImport;
    }

    async sumImportPrice(interval: { start: Date; end: Date } | null = null): Promise<number> {
        let filter = {};
        if (interval) {
            filter = {
                createdAt: { $gte: interval.start, $lte: interval.end }
            };
        }
        const result = await Import.aggregate([
            {
                $match: {
                    ...filter,
                }
            },
            {
                $group: {
                    _id: null,
                    totalImportPrice: { $sum: "$price" }
                }
            }
        ]).exec();

        if (result.length === 0) {
            return 0;
        }

        return result[0].totalImportPrice;
    }

}
export const importDao = new ImportDao();
export type IImport = WithId<InferSchemaType<typeof ImportSchema>> & { createdAt: Date };