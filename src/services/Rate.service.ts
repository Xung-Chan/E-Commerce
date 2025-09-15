import { CreateRateDto } from "../dto/Create.dto";
import rateDao from "../daos/Rate.dao.js";
import productDao from "../daos/Product.dao.js";
import ApiError from "../utils/ApiError";
const rateService = {
    createRate: async (data: CreateRateDto) => {
        return rateDao.create(data);
    },
    getAllRates: async () => {
        return rateDao.list();
    },
    getRateById: async (id: string) => {
        const rate = await rateDao.readById(id);
        if (!rate) {
            throw new ApiError(404, "Not Found", "Rate not found");
        }
        return rate;
    },
    getRatesByProductId: async (productId: string) => {
        const product = await productDao.readById(productId);
        if (!product) {
            throw new ApiError(404, "Not Found", "Product not found");
        }
        return rateDao.findBy({ productId: productId });
    },
    deleteRateById: async (id: string) => {
        return rateDao.deleteById(id);
    }
};

export default rateService;
