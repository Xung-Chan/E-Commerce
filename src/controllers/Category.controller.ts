import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { CreateCategoryDto } from "../dto/Create.dto.js";
import categoryService from "../services/Category.service.js";
import ApiResponse from "../utils/Api.response";
import ApiError from "../utils/ApiError";
import { UPLOAD_DIR } from "../services/Image.service.js";
export const categoryController = {
    createCategory: expressAsyncHandler(async (req: Request, res: Response) => {
        const data: CreateCategoryDto = req.body;
        data.image = UPLOAD_DIR + req.file?.filename;
        const category = await categoryService.createCategory(data);
        res.status(201).json(new ApiResponse(true, 201, "Category created successfully", category));
    }),
    getAllCategories: expressAsyncHandler(async (req: Request, res: Response) => {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(new ApiResponse(true, 200, "Categories fetched successfully", categories));
    }),
    getCategoryById: expressAsyncHandler(async (req: Request, res: Response) => {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            throw new ApiError(400, "Bad Request", "Category ID is required");
        }
        const category = await categoryService.getCategoryById(categoryId);
        if (!category) {
            throw new ApiError(404, "Not Found", "Category not found");
        }
        res.status(200).json(new ApiResponse(true, 200, "Category fetched successfully", category));
    }),
    deleteCategoryById: expressAsyncHandler(async (req: Request, res: Response) => {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            throw new ApiError(400, "Bad Request", "Category ID is required");
        }
        await categoryService.deleteCategoryById(categoryId);
        res.status(200).json(new ApiResponse(true, 200, "Category deleted successfully", null));
    })


}
export default categoryController;