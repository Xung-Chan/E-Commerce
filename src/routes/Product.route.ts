import { Router } from "express";
import siteController from "../controllers/Site.controller.js";

const productRouter = Router();

productRouter.get("/", siteController.home);
productRouter.get("/product/:productSlug", siteController.productBySlug);
productRouter.get("/product/:productSlug/:variantSlug", siteController.productBySlug);

export default productRouter;