import { Router } from "express";
import { authJwtAdmin } from "../middleware/auth.jwt";
import productController from "../controllers/Product.controller";
const productRouter = Router();
productRouter.get("/products", productController.getAllProducts);
productRouter.get("/products/:id", productController.getProductById);
productRouter.post("/products", authJwtAdmin, productController.createProduct);
productRouter.put("/products/:id", authJwtAdmin, productController.updateProductById);
productRouter.delete("/products/:id", authJwtAdmin, productController.deleteProductById);

export default productRouter;