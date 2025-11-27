import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import rateService from "../services/Rate.service.js";
import { CreateRateDto } from "../dto/Create.dto.js";
import ApiError from "../utils/ApiError.js";
import { ErrorDictionary } from "../middleware/errorDictionary.js";
import { createaRating } from "../middleware/validate.js";
import { CreateRatingRequest } from "../dto/Request.dto.js";
import ApiResponse from "../utils/Api.response.js";
const rateController = {
    createRate: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        if (!userId) {
            throw new ApiError(401, "Unauthorized", ErrorDictionary.UNAUTHORIZED);
        }


        const { rate, productId } = req.body;
        const errors = createaRating.validate({
            userId: userId,
            productId: productId,
            rating: rate,
        }, { abortEarly: false }).error;

        if (errors) {
            throw new ApiError(400, "Bad Request", errors.details.map((detail: any) => detail.message).join(", "));
        }

        const rateData: CreateRatingRequest = {
            userId: userId,
            productId: productId,
            rate: rate,
        };

        const result = await rateService.createRate(rateData);
        res.status(201).json(new ApiResponse(true, 201, "Rate created successfully", result));
    }),

    getAllRates: expressAsyncHandler(async (req: Request, res: Response) => {
        const rates = await rateService.getAllRates();
        res.status(200).json(new ApiResponse(true, 200, "Rates fetched successfully", rates));
    }),

    getMyRate: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        if (!userId) {
            throw new ApiError(401, "Unauthorized", ErrorDictionary.UNAUTHORIZED);
        }
        const productId = req.params.productId;
        if (!productId) {
            throw new ApiError(400, "Bad Request", "Product ID is required");
        }
        const rate = await rateService.getRateByUserAndProduct(userId, productId);
        res.status(200).json(new ApiResponse(true, 200, "Rate fetched successfully", rate));
    }),

    getRateById: expressAsyncHandler(async (req: Request, res: Response) => {
        const rateId = req.params.rateId;
        if (!rateId) {
            throw new ApiError(400, "Bad Request", "Rate ID is required");
        }
        const rate = await rateService.getRateById(rateId);
        res.status(200).json(new ApiResponse(true, 200, "Rate fetched successfully", rate));
    }),
    getRatesByProductId: expressAsyncHandler(async (req: Request, res: Response) => {
        const productId = req.params.productId;
        if (!productId) {
            throw new ApiError(400, "Bad Request", "Product ID is required");
        }
        const rates = await rateService.getRatesByProductId(productId);
        res.status(200).json(new ApiResponse(true, 200, "Rates fetched successfully", rates));
    }),
    deleteRateById: expressAsyncHandler(async (req: Request, res: Response) => {
        const rateId = req.params.rateId;
        if (!rateId) {
            throw new ApiError(400, "Bad Request", "Rate ID is required");
        }
        await rateService.deleteRateById(rateId);
        res.status(204).json(new ApiResponse(true, 204, "Rate deleted successfully", null));
    }),
};
export default rateController;