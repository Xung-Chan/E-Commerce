import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import productService from "../services/Product.service";
import { CreateProductDto } from "../dto/Create.dto";
import ApiError from "../utils/ApiError";
import { UpdateProductDto } from "../dto/Update.dto";
const productController = {
    createProduct: expressAsyncHandler(async (req: Request, res: Response) => {
        const productData: CreateProductDto = req.body;
        const product = await productService.createProduct(productData);
        res.status(201).json({ success: true, status: 201, message: "Product created successfully", data: product });
    }),
    getAllProducts: expressAsyncHandler(async (req: Request, res: Response) => {
        const products = await productService.getAllProducts();
        res.status(200).json({ success: true, status: 200, message: "Products fetched successfully", data: products });
    }),
    getProductById: expressAsyncHandler(async (req: Request, res: Response) => {
        const productId = req.params.productId;
        if (!productId) {
            throw new ApiError(400, "Bad Request", "Product ID is required");
        }
        const product = await productService.getProductById(productId);
        res.status(200).json({ success: true, status: 200, message: "Product fetched successfully", data: product });
    }),
    getProductsByBrandId: expressAsyncHandler(async (req: Request, res: Response) => {
        const brandId = req.params.brandId;
        if (!brandId) {
            throw new ApiError(400, "Bad Request", "Brand ID is required");
        }
        const products = await productService.getProductsByBrandId(brandId);
        res.status(200).json({ success: true, status: 200, message: "Products fetched successfully", data: products });
    }),
    getProductsByCategoryId: expressAsyncHandler(async (req: Request, res: Response) => {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            throw new ApiError(400, "Bad Request", "Category ID is required");
        }
        const products = await productService.getProductsByCategoryId(categoryId);
        res.status(200).json({ success: true, status: 200, message: "Products fetched successfully", data: products });
    }),
    getProductsByTag: expressAsyncHandler(async (req: Request, res: Response) => {
        const tag = req.params.tag;
        if (!tag) {
            throw new ApiError(400, "Bad Request", "Tag is required");
        }
        const products = await productService.getProductsByTag(tag);
        res.status(200).json({ success: true, status: 200, message: "Products fetched successfully", data: products });
    }),
    deleteProductById: expressAsyncHandler(async (req: Request, res: Response) => {
        const productId = req.params.productId;
        if (!productId) {
            throw new ApiError(400, "Bad Request", "Product ID is required");
        }
        await productService.deleteProductById(productId);
        res.status(204).json({ success: true, status: 204, message: "Product deleted successfully", data: null });
    }),
    updateProductById: expressAsyncHandler(async (req: Request, res: Response) => {
        const productId = req.params.productId;
        const updateData: UpdateProductDto = req.body;
        if (!productId) {
            throw new ApiError(400, "Bad Request", "Product ID is required");
        }
        await productService.updateProductById(productId, updateData);
        res.status(200).json({ success: true, status: 200, message: "Product updated successfully", data: null });
    })
};
export default productController;