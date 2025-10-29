import { variantDao } from "../daos/Variant.dao";
import { CreateVariantDto } from "../dto/Create.dto";
import { UpdateVariantDto } from "../dto/Update.dto";
import ApiError from "../utils/ApiError";

const variantService = {
    createVariant: async (data: CreateVariantDto) => {
        return variantDao.create(data);
    },
    getAllVariants: async () => {
        return variantDao.findBy({});
    },
    getVariantById: async (id: string) => {
        return variantDao.readById(id);
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