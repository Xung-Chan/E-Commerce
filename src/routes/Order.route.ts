import { Router } from "express";
import { authJwt, authJwtAdmin } from "../middleware/auth.jwt.js";
import orderController from "../controllers/Order.controller.js";
const orderRouter = Router();
orderRouter.get("/:id", authJwt, orderController.getOrderById);
orderRouter.post("/", authJwt, orderController.createOrder);
orderRouter.delete("/:id", authJwtAdmin, orderController.deleteOrderById);
orderRouter.get("/", authJwtAdmin, orderController.getAllOrders);
orderRouter.get("/user/:userId", authJwt, orderController.getOrderByUserId);
orderRouter.patch("/:id/status", authJwtAdmin, orderController.updateStatusById);

export default orderRouter;