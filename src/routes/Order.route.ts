import { Router } from "express";
import orderController from "../controllers/Order.controller.js";
import { authJwt, authJwtAdmin } from "../middleware/authJwt.middleware.js";


const orderRouter = Router();

orderRouter.get("/", authJwtAdmin, orderController.getAllOrders);
orderRouter.get("/search", authJwtAdmin, orderController.searchOrder);
orderRouter.delete("/:orderId", authJwtAdmin, orderController.deleteOrderById);
orderRouter.patch("/status/:orderId", authJwtAdmin, orderController.updateStatusById);

orderRouter.post("/", authJwt, orderController.createOrder);
orderRouter.get("/me", authJwt, orderController.getMyOrders);
orderRouter.get("/:orderId", authJwt, orderController.getOrderById);
orderRouter.get("/user/:userId", authJwt, orderController.getOrderByUserId);


export default orderRouter;