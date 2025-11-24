import { CouponStatus } from "../daos/Coupon.dao.js";

interface CouponDto {
    _id: string;
    code: string;
    discount: number;
    maxUse: number;
    used: number;
    status: CouponStatus;
    userIds: string[];
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export type { CouponDto };