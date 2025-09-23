import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { CreateProductDto } from "../dto/Create.dto.js";
import { UpdateProductDto } from "../dto/Update.dto.js";
import { UPLOAD_DIR } from "../services/Image.service.js";
import productService from "../services/Product.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";
import { Pagination, QueryUrl } from "../utils/Pagination.js";
import categoryService from "../services/Category.service.js";
import { ICategory } from "../daos/Category.dao.js";
const productController = {
    createProduct: expressAsyncHandler(async (req: Request, res: Response) => {
        const productData: CreateProductDto = req.body;
        productData.images = req.files ? (req.files as Express.Multer.File[]).map(file => UPLOAD_DIR + file.filename) : [];
        const product = await productService.createProduct(productData);
        res.status(201).json(new ApiResponse(true, 201, "Product created successfully", product));
    }),
    getAllProducts: expressAsyncHandler(async (req: Request, res: Response) => {
        const products = await productService.getAllProducts();
        res.status(200).json(new ApiResponse(true, 200, "Products fetched successfully", products));
    }),
    searchProducts: expressAsyncHandler(async (req: Request, res: Response) => {
        const query: QueryUrl = req.query;
        const products = await productService.searchProducts(query);
        res.status(200).json(new ApiResponse(true, 200, "Products fetched successfully", products));
    }),
    getProductById: expressAsyncHandler(async (req: Request, res: Response) => {
        const productId = req.params.productId;
        if (!productId) {
            throw new ApiError(400, "Bad Request", "Product ID is required");
        }
        const product = await productService.getProductById(productId);
        res.status(200).json(new ApiResponse(true, 200, "Product fetched successfully", product));
    }),
    getProductsByBrandId: expressAsyncHandler(async (req: Request, res: Response) => {
        const brandId = req.params.brandId;
        if (!brandId) {
            throw new ApiError(400, "Bad Request", "Brand ID is required");
        }
        const products = await productService.getProductsByBrandId(brandId);
        res.status(200).json(new ApiResponse(true, 200, "Products fetched successfully", products));
    }),
    getProductsByCategoryId: expressAsyncHandler(async (req: Request, res: Response) => {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            throw new ApiError(400, "Bad Request", "Category ID is required");
        }
        const products = await productService.getProductsByCategoryId(categoryId);
        res.status(200).json(new ApiResponse(true, 200, "Products fetched successfully", products));
    }),
    getProductsByTag: expressAsyncHandler(async (req: Request, res: Response) => {
        const tag = req.params.tag;
        const query: QueryUrl = req.query;
        if (!tag) {
            throw new ApiError(400, "Bad Request", "Tag is required");
        }
        const products = await productService.getProductsByTag(tag, query);
        res.status(200).json(new ApiResponse(true, 200, "Products fetched successfully", products));
    }),
    getProductForLandingPage: expressAsyncHandler(async (req: Request, res: Response) => {
        const bestSellers: Pagination = await productService.getProductsByTag("best-seller", { limit: "5" });
        const newArrivals: Pagination = await productService.getProductsByTag("new-arrival", { limit: "5" });
        const categories: ICategory[] = await categoryService.getCategoriesForLandingPage();
        const categoryProducts = [];
        for (const category of categories) {
            const products = await productService.getProductsByCategoryId(category._id.toString());
            categoryProducts.push({ name: category.name, products });
        }
        res.status(200).json(new ApiResponse(true, 200, "Products fetched successfully", { bestSellers: bestSellers.datas, newArrivals: newArrivals.datas, categoryProducts }));
    }),
    deleteProductById: expressAsyncHandler(async (req: Request, res: Response) => {
        const productId = req.params.productId;
        if (!productId) {
            throw new ApiError(400, "Bad Request", "Product ID is required");
        }
        await productService.deleteProductById(productId);
        res.status(204).json(new ApiResponse(true, 204, "Product deleted successfully", null));
    }),
    updateProductById: expressAsyncHandler(async (req: Request, res: Response) => {
        const productId = req.params.productId;
        const updateData: UpdateProductDto = req.body;
        if (!productId) {
            throw new ApiError(400, "Bad Request", "Product ID is required");
        }
        const product = await productService.updateProductById(productId, updateData);
        res.status(200).json(new ApiResponse(true, 200, "Product updated successfully", product));
    })
};
export default productController;