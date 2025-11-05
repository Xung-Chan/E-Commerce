import { Router } from "express";
import { authJwt, authJwtAdmin } from "../middleware/authJwt.middleware.js";
import orderController from "../controllers/Order.controller.js";
const orderRouter = Router();
orderRouter.get("/", authJwtAdmin, orderController.getAllOrders);
orderRouter.get("/search", authJwtAdmin, orderController.searchOrder);
orderRouter.post("/", authJwt, orderController.createOrder);
orderRouter.get("/me", authJwt, orderController.getMyOrders);
orderRouter.get("/:orderId", authJwt, orderController.getOrderById);
orderRouter.delete("/:orderId", authJwtAdmin, orderController.deleteOrderById);
orderRouter.get("/user/:userId", authJwt, orderController.getOrderByUserId);
orderRouter.patch("/status/:orderId", authJwtAdmin, orderController.updateStatusById);

export default orderRouter;