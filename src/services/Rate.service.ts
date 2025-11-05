import { CreateRateDto } from "../dto/Create.dto.js";
import { rateDao } from "../daos/Rate.dao.js";
import { productDao } from "../daos/Product.dao.js";
import ApiError from "../utils/ApiError.js";
import { CreateRatingRequest } from "../dto/Request.dto.js";
import { ioServer } from "../index.js";
const rateService = {
    createRate: async (data: CreateRatingRequest) => {
        const product = await productDao.readById(data.productId);
        if (!product) {
            throw new ApiError(404, "Not Found", "Product not found");
        }
        const createdRate = await rateDao.create(
            {
                userId: data.userId,
                productId: data.productId,
                fullName: "Anonymous",
                rate: data.rate,
            }
        );
        ioServer.to(`product_${data.productId}`).emit("newRate", createdRate);

        if (!createdRate) {
            throw new Error("Failed to create rate");
        }
        return createdRate;
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
