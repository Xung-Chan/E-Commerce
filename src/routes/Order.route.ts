import { Router } from "express";
import { authJwt, authJwtAdmin } from "../middleware/authJwt.middleware.js";
import orderController from "../controllers/Order.controller.js";
const orderRouter = Router();
orderRouter.get("/:orderId", authJwt, orderController.getOrderById);
orderRouter.get("/", authJwtAdmin, orderController.getAllOrders);
orderRouter.post("/", authJwt, orderController.createOrder);
orderRouter.delete("/:orderId", authJwtAdmin, orderController.deleteOrderById);
orderRouter.get("/user/:userId", authJwt, orderController.getOrderByUserId);
orderRouter.patch("/:orderId/status", authJwtAdmin, orderController.updateStatusById);

export default orderRouter;