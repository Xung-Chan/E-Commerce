import { Router } from "express";
import productController from "../controllers/Product.controller";
const catalogRouter = Router();
catalogRouter.get("/brand/:brandId", productController.getProductsByBrandId);
catalogRouter.get("/category/:categoryId", productController.getProductsByCategoryId);
catalogRouter.get("/tag/:tag", productController.getProductsByTag);

export default catalogRouter;