import brandDao from "../daos/Brand.dao.js";
import { CreateBrandDto } from "../dto/Create.dto.js";
import { UpdateBrandDto } from "../dto/Update.dto.js";
import ApiError from "../utils/ApiError.js";
const brandService = {
    createBrand: async (data: CreateBrandDto) => {
        return brandDao.create(data);
    },
    getAllBrands: async () => {
        return brandDao.findBy({});
    },
    getBrandById: async (id: string) => {
        return brandDao.readById(id);
    },
    deleteBrandById: async (id: string) => {
        return brandDao.deleteById(id);
    },
    updateBrandById: async (id: string, data: UpdateBrandDto) => {
        const existingBrand = await brandDao.readById(id);
        if (!existingBrand) {
            throw new ApiError(404, "Not Found", "Brand not found");
        }
        return brandDao.patchById(id, data);
    }

}
export default brandService;