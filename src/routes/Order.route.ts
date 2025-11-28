import { Router } from "express";
import orderController from "../controllers/Order.controller.js";
import { authAnonymous, authJwt, authJwtAdmin } from "../middleware/authJwt.middleware.js";


const orderRouter = Router();

orderRouter.get("/search", authJwtAdmin, orderController.searchOrder);
orderRouter.delete("/:orderId", authJwtAdmin, orderController.deleteOrderById);
orderRouter.patch("/status/:orderId", authJwtAdmin, orderController.updateStatusById);

orderRouter.post("/", orderController.createOrder);
orderRouter.get("/me", authJwt, orderController.getMyOrders);
orderRouter.get("/:orderId", orderController.getOrderById);


export default orderRouter;