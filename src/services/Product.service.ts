import { brandDao } from "../daos/Brand.dao.js";
import { categoryDao } from "../daos/Category.dao.js";
import { productDao } from "../daos/Product.dao.js";
import { variantDao } from "../daos/Variant.dao.js";
import { CreateVariantDto } from '../dto/Create.dto.js';
import { CreateProductRequest } from "../dto/Request.dto.js";
import { UpdateProductDto } from "../dto/Update.dto.js";
import { ErrorDictionary } from "../middleware/errorDictionary.js";
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
        const product = await productDao.create({
            ...data,
            minPrice: Math.min(...data.variants.map(v => v.price)),
            maxPrice: Math.max(...data.variants.map(v => v.price))
        });
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
        const filter: any = {};
        const page = parseInt((query.page || "1"), 10);
        const limit = parseInt((query.limit || "10"), 10);
        // Map UI sort key 'rate' to schema field 'averageRate'
        const sortByRaw = query.sortBy || "name";
        const sortBy = sortByRaw === "rate" ? "averageRate" : sortByRaw;
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

        // Rating (averageRate) threshold filter
        if (query.rating !== undefined && query.rating !== null && query.rating !== "") {
            const r = Number(query.rating);
            if (!Number.isNaN(r) && r >= 0 && r <= 5) {
                (filter as any).averageRate = { $gte: r };
            }
        }
        // Price filter via variants collection
        const hasMin = query.minPrice !== undefined && query.minPrice !== "";
        const hasMax = query.maxPrice !== undefined && query.maxPrice !== "";
        if (hasMin || hasMax) {
            const priceCond: any = {};
            if (hasMin) priceCond.$gte = Number(query.minPrice);
            if (hasMax) priceCond.$lte = Number(query.maxPrice);
            const matchedVariants = await variantDao.findBy({ price: priceCond });
            const productIdSet = new Set(matchedVariants.map(v => v.productId?.toString()).filter(Boolean));
            if (productIdSet.size === 0) {
                return new Pagination([], page, limit, 0);
            }
            filter._id = { $in: Array.from(productIdSet) };
        }

        const products = await productDao.findBy(filter, options);

        // Enrich products with variants and ensure first variant price can be shown
        const datas = await Promise.all(products.map(async (p: any) => {
            const variants = await variantService.getVariantsByProductId(p._id.toString());
            // sort variants by createdAt asc to define the "first" variant
            variants.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            return { ...p, variants };
        }));

        const totalDatas = await productDao.count(filter);
        return new Pagination(datas, page, limit, totalDatas);
    },

    getProductById: async (id: string) => {
        const product = await productDao.readById(id);
        if (!product) {
            throw new ApiError(404, "Not Found", "Product not found");
        }
        const variants = await variantService.getVariantsByProductId(id);
        return {
            ...product,
            variants: variants
        };
    },

    getProductsByBrandId: async (brandId: string) => {
        const brand = await brandDao.readById(brandId);
        if (!brand) {
            throw new ApiError(404, "Not Found", ErrorDictionary.BRAND_NOT_FOUND);
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

        const products = await productDao.findBy({}, options);
        // const datas = await Promise.all(products.map(async product => {
        //     const variants = await variantService.getVariantsByProductId(product._id.toString());
        //     return {
        //         ...product,
        //         // variants: variants
        //     };
        // }))
        // console.log(datas);
        const totalDatas = await productDao.count({});
        return new Pagination(products, page, limit, totalDatas);
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
        const datas = products.map(async product => {
            const variants = await variantService.getVariantsByProductId(product._id.toString());
            return {
                ...product,
                variants: variants
            };
        })

        return datas
    }

};
export default productService;
