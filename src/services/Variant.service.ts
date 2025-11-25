import { variantDao } from "../daos/Variant.dao.js";
import { CreateVariantDto } from "../dto/Create.dto.js";
import { UpdateVariantDto } from "../dto/Update.dto.js";
import { ErrorDictionary } from "../middleware/errorDictionary.js";
import ApiError from "../utils/ApiError.js";

const variantService = {
    createVariant: async (data: CreateVariantDto) => {
        const productExists = await variantDao.findBy({ productId: data.productId });
        if (!productExists) {
            throw new ApiError(404, "Not Found", "Product not found");
        }
        const existingVariant = await variantDao.findBy({ productId: data.productId, distinctFeature: data.distinctFeature });
        if (existingVariant && existingVariant.length > 0) {
            throw new ApiError(409, "Conflict", "Variant with the same distinct feature already exists for this product");
        }
        return variantDao.create(data);
    },
    getAllVariants: async () => {
        return variantDao.findBy({});
    },
    getVariantById: async (id: string) => {
        const variant = await variantDao.readById(id);
        if (!variant) {
            throw new ApiError(404, "Not Found", ErrorDictionary.VARIANT_NOT_FOUND);
        }
        return variant;
    },
    deleteVariantById: async (id: string) => {
        return variantDao.deleteById(id);
    },
    updateVariantById: async (id: string, data: UpdateVariantDto) => {
        const existingVariant = await variantDao.readById(id);
        if (!existingVariant) {
            throw new ApiError(404, "Not Found", "Variant not found");
        }
        return variantDao.patchById(id, data);
    },
    getVariantsByProductId: async (productId: string) => {
        return variantDao.findBy({ productId });
    }

}
export default variantService;