import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import rateService from "../services/Rate.service";
import { CreateRateDto } from "../dto/Create.dto";
import ApiError from "../utils/ApiError";
const rateController = {
    createRate: expressAsyncHandler(async (req: Request, res: Response) => {
        const rateData: CreateRateDto = req.body;
        const rate = await rateService.createRate(rateData);
        res.status(201).json({ success: true, status: 201, message: "Rate created successfully", data: rate });
    }),
    getAllRates: expressAsyncHandler(async (req: Request, res: Response) => {
        const rates = await rateService.getAllRates();
        res.status(200).json({ success: true, status: 200, message: "Rates fetched successfully", data: rates });
    }),
    getRateById: expressAsyncHandler(async (req: Request, res: Response) => {
        const rateId = req.params.rateId;
        if (!rateId) {
            throw new ApiError(400, "Bad Request", "Rate ID is required");
        }
        const rate = await rateService.getRateById(rateId);
        res.status(200).json({ success: true, status: 200, message: "Rate fetched successfully", data: rate });
    }),
    getRatesByProductId: expressAsyncHandler(async (req: Request, res: Response) => {
        const productId = req.params.productId;
        if (!productId) {
            throw new ApiError(400, "Bad Request", "Product ID is required");
        }
        const rates = await rateService.getRatesByProductId(productId);
        res.status(200).json({ success: true, status: 200, message: "Rates fetched successfully", data: rates });
    }),
    deleteRateById: expressAsyncHandler(async (req: Request, res: Response) => {
        const rateId = req.params.rateId;
        if (!rateId) {
            throw new ApiError(400, "Bad Request", "Rate ID is required");
        }
        await rateService.deleteRateById(rateId);
        res.status(204).json({ success: true, status: 204, message: "Rate deleted successfully", data: null });
    }),
};
export default rateController;