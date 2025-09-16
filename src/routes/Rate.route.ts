import { Router } from "express";
import { authJwt, authJwtAdmin } from "../middleware/auth.jwt.js";
import rateController from "../controllers/Rate.controller.js";
const rateRouter = Router();
rateRouter.get("/product/:productId", rateController.getRatesByProductId);
rateRouter.post("/:productId", authJwt, rateController.createRate);
rateRouter.delete("/:id", authJwtAdmin, rateController.deleteRateById);
rateRouter.get("/", authJwtAdmin, rateController.getAllRates);
export default rateRouter;