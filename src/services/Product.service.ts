import productDao from "../daos/Product.dao.js";
import { CreateProductDto } from "../dto/Create.dto";
import { UpdateProductDto } from "../dto/Update.dto";
import ApiError from "../utils/ApiError";
import brandDao from "../daos/Brand.dao.js";
import categoryDao from "../daos/Category.dao.js";
import SortOption from "../utils/SortOption.js";
import { create } from "domain";
const productService = {
    createProduct: async (data: CreateProductDto) => {
        return productDao.create(data);
    },
    //for development use only
    createManyProducts: async (products: CreateProductDto[]) => {
        products.forEach(product => productDao.create(product));
        return;
    },
    getAllProducts: async () => {
        return productDao.list();
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
    getProductsByTag: async (tag: string) => {
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
        return productDao.sortBy(sortOption);
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
    }
};
export default productService;
