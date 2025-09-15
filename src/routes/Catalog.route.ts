import { Router } from "express";
import productController from "../controllers/Product.controller";
const catalogRouter = Router();
catalogRouter.get("/brand/:id", productController.getProductsByBrandId);
catalogRouter.get("/category/:id", productController.getProductsByCategoryId);
catalogRouter.get("/tag/:tag", productController.getProductsByTag);
export default catalogRouter;