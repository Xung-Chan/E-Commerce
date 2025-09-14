import { Request, Response } from "express";
import brandService from "../services/Brand.service.js";
import ApiResponse from "../utils/Api.response.js";
import expressAsyncHandler from "express-async-handler";
import { create } from "domain";
const brandController = {
    getAllBrands: expressAsyncHandler(async (req: Request, res: Response) => {
        const response = await brandService.getAllBrands();
        res.status(200).json(new ApiResponse(true, 200, "Brands retrieved successfully", response));

    })
    // createBrand: expressAsyncHandler(async (req: Request, res: Response) => {
    //     const { name } = req.body;
    //     const brand = await brandService.createBrand({ name });
    //     res.status(201).json(new ApiResponse(true, 201, "Brand created successfully", brand));
    // })
}
export default brandController;