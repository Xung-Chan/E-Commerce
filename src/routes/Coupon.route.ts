import { Router } from "express";
import { authJwt, authJwtAdmin } from "../middleware/auth.jwt.js";
import couponController from "../controllers/Coupon.controller.js";
const couponRouter = Router();
couponRouter.get("/:id", couponController.getCouponById);
couponRouter.post("/", authJwtAdmin, couponController.createCoupon);
couponRouter.delete("/:id", authJwtAdmin, couponController.deleteCouponById);
export default couponRouter;