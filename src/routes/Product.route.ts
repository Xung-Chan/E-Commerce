import { Router } from "express";
import { authJwtAdmin } from "../middleware/authJwt.middleware";
import productController from "../controllers/Product.controller";
import { uploadMultiple } from "../middleware/multer.middleware";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/landing", productController.getProductForLandingPage);
productRouter.get("/search", productController.searchProducts);
productRouter.post("/", authJwtAdmin, uploadMultiple, productController.createProduct);
productRouter.get("/details/:productId", productController.getProductById);
productRouter.put("/details/:productId", authJwtAdmin, productController.updateProductById);
productRouter.delete("/details/:productId", authJwtAdmin, productController.deleteProductById);

export default productRouter;