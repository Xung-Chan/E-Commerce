import { Router } from "express";
import shippingMethodController from "../controllers/ShippingMethod.controller.js";


const shippingRouter = Router()

shippingRouter.get("/", shippingMethodController.getAllShippingMethods);
shippingRouter.post("/", shippingMethodController.createShippingMethod);
shippingRouter.get("/:name", shippingMethodController.getShippingMethodByName);


export default shippingRouter;