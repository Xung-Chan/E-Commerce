import { CreateCouponDto } from '../dto/Create.dto.js';
import { couponDao } from '../daos/Coupon.dao.js';
const couponService = {
    createCoupon: async (data: CreateCouponDto) => {
        return couponDao.create(data);
    },
    getAllCoupons: async () => {
        return couponDao.list();
    },
    getCouponById: async (id: string) => {
        return couponDao.readById(id);
    },
    deleteCouponById: async (id: string) => {
        return couponDao.deleteById(id);
    },
    updateCouponById: async (id: string, data: Partial<CreateCouponDto>) => {
        return couponDao.patchById(id, data);
    }
};
export default couponService;