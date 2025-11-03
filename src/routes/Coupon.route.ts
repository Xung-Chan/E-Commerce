import { Router } from "express";

import couponController from "../controllers/Coupon.controller.js";
import { authJwtAdmin } from "../middleware/authJwt.middleware.js";
import { upload } from "../services/Image.service.js";

const couponRouter = Router();

couponRouter.get("/", couponController.getAllCoupons);
couponRouter.get("/:couponId", couponController.getCouponById);
couponRouter.post("/", authJwtAdmin, upload.none(), couponController.createCoupon);
couponRouter.delete("/:couponId", authJwtAdmin, couponController.deleteCouponById);
couponRouter.get("/code/:couponCode", couponController.getCouponByCode);
couponRouter.get("/search/query", couponController.getCouponByQuery);

export default couponRouter;