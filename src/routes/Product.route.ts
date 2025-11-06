import { Router } from "express";
import { authJwtAdmin } from "../middleware/authJwt.middleware.js";
import productController from "../controllers/Product.controller.js";
import { uploadMultiple } from "../middleware/multer.middleware.js";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/landing", productController.getProductForLandingPage);
productRouter.get("/search", productController.searchProducts);
productRouter.post("/", authJwtAdmin, uploadMultiple, productController.createProduct);
productRouter.get("/:productId", productController.getProductById);
productRouter.put("/:productId", authJwtAdmin, productController.updateProductById);
productRouter.delete("/:productId", authJwtAdmin, productController.deleteProductById);

export default productRouter;   