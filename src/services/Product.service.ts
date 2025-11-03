import { brandDao } from "../daos/Brand.dao.js";
import { categoryDao } from "../daos/Category.dao.js";
import { productDao } from "../daos/Product.dao.js";
import { CreateVariantDto } from '../dto/Create.dto.js';
import { CreateProductRequest } from "../dto/Request.dto.js";
import { UpdateProductDto } from "../dto/Update.dto.js";
import ApiError from "../utils/ApiError.js";
import { Pagination, ProductQuery } from "../utils/Pagination.js";
import SortOption from "../utils/SortOption.js";
import variantService from "./Variant.service.js";

const productService = {
    createProduct: async (data: CreateProductRequest) => {
        const brand = await brandDao.readById(data.brandId);
        if (!brand) {
            throw new ApiError(404, "Not Found", "Brand not found");
        }
        const category = await categoryDao.readById(data.categoryId);
        if (!category) {
            throw new ApiError(404, "Not Found", "Category not found");
        }
        const product = await productDao.create(data);
        data.variants.forEach(async (variant) => {
            const variantData: CreateVariantDto = {
                productId: product._id.toString(),
                distinctFeature: variant.distinctFeature,
                price: variant.price,
                stock: variant.stock,
                discount: variant.discount || 0
            };
            await variantService.createVariant(variantData);
        });
        return product;
    },

    getAllProducts: async () => {
        return productDao.list();
    },

    searchProducts: async (query: ProductQuery) => {
        const filter: {
            name?: { $regex: string, $options: string };
            categoryId?: string;
            brandId?: string;
            "variants.price"?: { $gte?: number, $lte?: number };
        } = {};
        const page = parseInt((query.page || "1"), 10);
        const limit = parseInt((query.limit || "10"), 10);
        const sortBy = query.sortBy || "name";
        const sortOrder = query.sortOrder === "desc" ? -1 : 1;
        const options = {
            skip: (page - 1) * limit,
            limit: limit,
            sort: { [sortBy]: sortOrder },
        }
        if (query.name) {
            filter.name = { $regex: query.name, $options: "i" };
        }
        if (query.categoryId) {
            filter.categoryId = query.categoryId;
        }
        if (query.brandId) {
            filter.brandId = query.brandId;
        }

        if (query.minPrice !== undefined || query.maxPrice !== undefined) {
            filter["variants.price"] = {};
            filter["variants.price"] = {};
            if (query.minPrice !== undefined) {
                filter["variants.price"].$gte = Number(query.minPrice);
            }
            if (query.maxPrice !== undefined) {
                filter["variants.price"].$lte = Number(query.maxPrice);
            }
        }
        console.log(filter);
        const data = await productDao.findBy(filter, options);
        const totalDatas = await productDao.count(filter);
        return new Pagination(data, page, limit, totalDatas);
    },

    getProductById: async (id: string) => {
        const product = await productDao.readById(id);
        if (!product) {
            throw new ApiError(404, "Not Found", "Product not found");
        }
        return product;
    },

    getProductsByBrandId: async (brandId: string) => {
        const brand = await brandDao.readById(brandId);
        if (!brand) {
            throw new ApiError(404, "Not Found", "Brand not found");
        }
        return productDao.findBy({ brandId });
    },

    getProductsByCategoryId: async (categoryId: string) => {
        const category = await categoryDao.readById(categoryId);
        if (!category) {
            throw new ApiError(404, "Not Found", "Category not found");
        }
        return productDao.findBy({ categoryId });
    },

    getProductsByTag: async (tag: string, query: ProductQuery = {}) => {
        let sortOption: SortOption;
        switch (tag) {
            case "best-seller":
                sortOption = new SortOption("soldCount", -1);
                break;
            case "new-arrival":
                sortOption = new SortOption("createdAt", -1);
                break
            case "top-rated":
                sortOption = new SortOption("rate", -1);
                break;
            default:
                throw new ApiError(400, "Bad Request", "Invalid tag");
        }
        const page = parseInt((query.page || "1"), 10);
        const limit = parseInt((query.limit || "10"), 10);
        const options = {
            skip: (page - 1) * limit,
            limit: limit,
            sort: sortOption.toQuery(),
        }

        const data = await productDao.findBy({}, options);
        const totalDatas = await productDao.count({});
        return new Pagination(data, page, limit, totalDatas);
    },

    deleteProductById: async (id: string) => {
        const product = await productDao.readById(id);
        if (!product) {
            throw new ApiError(404, "Not Found", "Product not found");
        }
        return productDao.deleteById(id);
    },

    updateProductById: async (id: string, data: UpdateProductDto) => {
        const product = await productDao.readById(id);
        if (!product) {
            throw new ApiError(404, "Not Found", "Product not found");
        }
        return productDao.patchById(id, data);
    },

    getBestSellingProducts: async (limit: number = 10) => {
        const options = {
            limit: limit,
            sort: { soldCount: -1 },
        }
        const products = await productDao.findBy({}, options);

        return products.map(product => ({
            productId: product._id.toString(),
            productName: product.name,
            sold: product.soldCount
        }));
    }

};
export default productService;
