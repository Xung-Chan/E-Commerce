import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { CreateBrandDto } from "../dto/Create.dto.js";
import { UpdateBrandDto } from "../dto/Update.dto.js";
import brandService from "../services/Brand.service.js";
import { UPLOAD_DIR } from "../services/Image.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";
const brandController = {
    createBrand: expressAsyncHandler(async (req: Request, res: Response) => {
        const data: CreateBrandDto = req.body;
        data.image = UPLOAD_DIR + req.file?.filename;
        const brand = await brandService.createBrand(data);
        res.status(201).json(new ApiResponse(true, 201, "Brand created successfully", brand));
    }),
    getAllBrands: expressAsyncHandler(async (req: Request, res: Response) => {
        const response = await brandService.getAllBrands();
        res.status(200).json(new ApiResponse(true, 200, "Brands retrieved successfully", response));

    }),
    getBrandById: expressAsyncHandler(async (req: Request, res: Response) => {
        const brandId = req.params.brandId;
        if (!brandId) {
            throw new ApiError(400, "Brand ID is required", "Brand ID is required");
        }
        const brand = await brandService.getBrandById(brandId);
        if (!brand) {
            throw new ApiError(404, "Not Found", "Brand not found");
        }
        res.status(200).json(new ApiResponse(true, 200, "Brand retrieved successfully", brand));
    }),
    deleteBrandById: expressAsyncHandler(async (req: Request, res: Response) => {
        const brandId = req.params.brandId;
        if (!brandId) {
            throw new ApiError(400, "Brand ID is required", "Brand ID is required");
        }
        await brandService.deleteBrandById(brandId);
        res.status(200).json(new ApiResponse(true, 200, "Brand deleted successfully", null));
    }),
    updateBrandById: expressAsyncHandler(async (req: Request, res: Response) => {
        const brandId = req.params.brandId;
        if (!brandId) {
            throw new ApiError(400, "Brand ID is required", "Brand ID is required");
        }
        const data: UpdateBrandDto = req.body;
        const brand = await brandService.updateBrandById(brandId, data);
        res.status(200).json(new ApiResponse(true, 200, "Brand updated successfully", brand));
    })
}
export default brandController;