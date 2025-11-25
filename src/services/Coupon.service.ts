import { CreateCouponDto } from '../dto/Create.dto.js';
import { couponDao, CouponStatus, ICoupon } from '../daos/Coupon.dao.js';
import { UpdateCouponDto } from '../dto/Update.dto.js';
import ApiError from '../utils/ApiError.js';
import { CouponQuery, Pagination } from '../utils/Pagination.js';



class CouponService {
    private async generateCouponCode(): Promise<string> {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        while (true) {
            let code = '';
            for (let i = 0; i < 5; i++) {
                code += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            const existingCoupon = await couponDao.findOneBy({ code });
            if (!existingCoupon) {
                return code;
            }
        }
    }
    async createCoupon(data: CreateCouponDto): Promise<ICoupon> {
        if (!data.code) {
            data.code = await this.generateCouponCode();
        }
        const coupon = await couponDao.create(data);
        return coupon;
    }


    async getCouponByQuery(query: CouponQuery): Promise<Pagination<ICoupon>> {
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
    }

    async getCouponById(id: string): Promise<ICoupon> {
        const coupon = await couponDao.readById(id);
        if (!coupon) {
            throw new ApiError(404, "Not Found", "Mã giảm giá không tồn tại hoặc đã hết hạn");
        }
        return coupon;
    }

    async getCouponByCode(code: string): Promise<ICoupon> {
        const coupons = await couponDao.findOneBy({ code });
        if (!coupons) {
            throw new ApiError(404, "Not Found", "Mã giảm giá không tồn tại hoặc đã hết hạn");
        }
        return coupons;
    }

    async deleteCouponById(id: string): Promise<boolean> {
        return await couponDao.deleteById(id);
    }


    async useCoupon(id: string, userId: string): Promise<boolean> {
        const coupon = await couponDao.findOneBy({ _id: id, status: "active" });
        if (!coupon) {
            throw new ApiError(404, "Coupon Error", "Mã giảm giá không tồn tại hoặc đã hết hạn");
        }

        if (coupon.userIds.map(id => id.toString()).includes(userId)) {
            throw new ApiError(400, "Coupon Error", "Bạn đã sử dụng mã giảm giá này rồi");
        }

        coupon.used += 1;
        if (coupon.used == coupon.maxUse) {
            coupon.status = CouponStatus.INACTIVE;
        }



        return await couponDao.patchById(coupon._id.toString(), { used: coupon.used, status: coupon.status, userIds: [...coupon.userIds, userId] });
    }

}
const couponService = new CouponService();
export default couponService;