import { Request, Response } from "express";
import brandService from "../services/Brand.service.js";
import ApiResponse from "../utils/Api.response.js";
import expressAsyncHandler from "express-async-handler";
const brandController = {
    getAllBrands: expressAsyncHandler(async (req: Request, res: Response) => {
        const response = await brandService.getAllBrands();
        res.status(200).json(new ApiResponse(true, 200, "Brands retrieved successfully", response));

    })
}
export default brandController;