import { CreateCouponDto } from '../dto/Create.dto.js';
import { couponDao } from '../daos/Coupon.dao.js';
import { UpdateCouponDto } from '../dto/Update.dto.js';
import ApiError from '../utils/ApiError.js';
import { CouponQuery, Pagination } from '../utils/Pagination.js';

const couponService = {
    createCoupon: async (data: CreateCouponDto) => {
        return couponDao.create(data);
    },

    getAllCoupons: async () => {
        return couponDao.list();
    },

    getCouponByQuery: async (query: CouponQuery) => {
        const filter: {
            code?: string;
            status?: string;
        } = {};

        if (query.code) filter.code = query.code;
        if (query.status) filter.status = query.status;

        const page = parseInt((query.page || "1"), 10);
        const limit = parseInt((query.limit || "10"), 10);
        const sortBy = query.sortBy || "updatedAt";
        const sortOrder = query.sortOrder === "desc" ? -1 : 1;

        const options = {
            skip: (page - 1) * limit,
            limit: limit,
            sort: { [sortBy]: sortOrder },
        }

        const data = await couponDao.findBy(filter, options);
        const totalDatas = await couponDao.count(filter);
        return new Pagination(data, page, limit, totalDatas);
    },

    getCouponById: async (id: string) => {
        return couponDao.readById(id);
    },

    getCouponByCode: async (code: string) => {
        const coupons = await couponDao.findBy({ code });
        return coupons ? coupons[0] : null;
    },

    deleteCouponById: async (id: string) => {
        return couponDao.deleteById(id);
    },

    updateCouponById: async (id: string, data: Partial<UpdateCouponDto>) => {
        return couponDao.patchById(id, data);
    },

    increaseCouponUsage: async (id: string) => {
        const coupon = await couponDao.findOneBy({ _id: id, status: "active" });
        if (!coupon) {
            throw new ApiError(404, "Coupon Error", "Coupon not found or inactive");
        }
        coupon.used += 1;
        if (coupon.used == coupon.maxUse) {
            coupon.status = "inactive";
        }
        return await couponDao.patchById(id, { used: coupon.used, status: coupon.status });

    }

}
export default couponService;