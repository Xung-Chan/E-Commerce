import { brandDao } from "../daos/Brand.dao.js";
import { categoryDao } from "../daos/Category.dao.js";
import { productDao } from "../daos/Product.dao.js";
import { variantDao } from "../daos/Variant.dao.js";
import { CreateVariantDto } from '../dto/Create.dto.js';
import { CreateProductRequest, UpdateProductRequest } from "../dto/Request.dto.js";
import { UpdateProductDto, UpdateVariantDto } from "../dto/Update.dto.js";
import { ErrorDictionary } from "../middleware/errorDictionary.js";
import ApiError from "../utils/ApiError.js";
import { Pagination, ProductQuery } from "../utils/Pagination.js";
import SortOption from "../utils/SortOption.js";
import variantService from "./Variant.service.js";
import categoryService from "./Category.service.js"; 
import brandService from "./Brand.service.js";

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
        let minPrice = Math.min(...data.variants.map(v => v.price));
        let maxPrice = Math.max(...data.variants.map(v => v.price));
        if (data.discount) {
            minPrice = minPrice - (minPrice * data.discount) / 100;
            maxPrice = maxPrice - (maxPrice * data.discount) / 100;
        }
        const product = await productDao.create({
            ...data,
            minPrice: minPrice,
            maxPrice: maxPrice
        });
        data.variants.forEach(async (variant) => {
            const variantData: CreateVariantDto = {
                productId: product._id.toString(),
                distinctFeature: variant.distinctFeature,
                price: variant.price,
                stock: variant.stock,
            };
            await variantService.createVariant(variantData);
        });
        return product;
    },


    searchProducts: async (query: ProductQuery) => {
        const filter: {
            name?: { $regex: string, $options: string };
            categoryId?: string;
            brandId?: string;
            minPrice?: { $gte: number };
            maxPrice?: { $lte: number };
            rate?: { $gte: number };
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
        if (query.rating !== undefined) {
            filter.rate = { $gte: Number(query.rating) };
        }
        if (query.minPrice !== undefined) {
            filter.minPrice = { $gte: Number(query.minPrice) };
        }
        if (query.maxPrice !== undefined) {
            filter.maxPrice = { $lte: Number(query.maxPrice) };
        }

        const data = await productDao.findBy(filter, options);
        const totalDatas = await productDao.count(filter);
        return new Pagination(data, page, limit, totalDatas);
    },

    getProductById: async (id: string) => {
        const product = await productDao.readById(id);
        if (!product) {
            throw new ApiError(404, "Not Found", "Product not found");
        }
        const variants = await variantService.getVariantsByProductId(id);
        return {
            ...product,
            variants: variants.map(variant => ({
                ...variant,
                discountPrice: product.discount ? variant.price - (variant.price * product.discount) / 100 : variant.price
            }))
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

    updateProductById: async (id: string, data: UpdateProductRequest) => {
        const product = await productDao.readById(id);
        if (!product) {
            throw new ApiError(404, "Not Found", ErrorDictionary.PRODUCT_NOT_FOUND);
        }
        let newData: UpdateProductDto = { ...data };
        if (data.discount && (data.discount < 0 || data.discount > 50)) {
            throw new ApiError(400, "Bad Request", "Giảm giá phải từ 0 đến 50%");
        }


        if (data.variants) {
            await Promise.all(data.variants.map(async (variant) => {
                let data: UpdateVariantDto = {};
                if (variant.distinctFeature) {
                    data.distinctFeature = variant.distinctFeature;
                }
                if (variant.price) {
                    data.price = variant.price;
                }

                if (variant.stock) {
                    data.stock = variant.stock;
                }

                const result = await variantService.updateVariantById(variant.id, data);
                if (!result) {
                    throw new ApiError(500, "Internal Server Error", `Cập nhật variant ${variant.id} thất bại`);
                }
            }));
            const variantUpdates = await variantService.getVariantsByProductId(id);
            let minPrice = Math.min(...variantUpdates.map(v => v.price));
            let maxPrice = Math.max(...variantUpdates.map(v => v.price));

            if (data.discount) {
                minPrice = minPrice - (minPrice * data.discount) / 100;
                maxPrice = maxPrice - (maxPrice * data.discount) / 100;
            }

            newData = { ...newData, minPrice, maxPrice };
        }
        console.log(newData);
        return productDao.patchById(id, newData);
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
    },

    //admin

    getProductsForAdmin: async (filter: any = {}): Promise<any[]> => {
        const products = await productDao.findBy(filter); 

        const mappedProducts = await Promise.all(products.map(async product => {
            const productId = product._id.toString();
  
            const variants = await variantService.getVariantsByProductId(productId);
            const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);
 
            const category = await categoryService.getCategoryById(product.categoryId.toString());
            const categoryName = category ? category.name : 'N/A';

            const brand = await brandService.getBrandById(product.brandId.toString());
            const brandName = brand ? brand.name : 'N/A'; 
            return {
                id: productId,
                name: product.name,
                image: product.images[0] || '/img/placeholder.jpg',
                price: product.minPrice,
                categoryName: categoryName,
                brandName: brandName, 
                stockQuantity: totalStock,
                status: totalStock > 0 ? 'Active' : 'Hết hàng',
            };
        }));
        
        return mappedProducts;
    },
    getProductDetailForAdmin: async (id: string) => {
        const product = await productDao.readById(id); 
        if (!product) {
            throw new ApiError(404, "Not Found", "Product not found");
        }
        
        const brand = await brandService.getBrandById(product.brandId.toString());
        const category = await categoryService.getCategoryById(product.categoryId.toString());
        const variants = await variantService.getVariantsByProductId(id);

        return {
            ...product,
            brandName: brand ? brand.name : 'N/A', 
            categoryName: category ? category.name : 'N/A',
            
            variants: variants.map(variant => ({
                ...variant,
                discountPrice: product.discount ? variant.price - (variant.price * product.discount) / 100 : variant.price
            }))
        };
    },
    
};
export default productService;
