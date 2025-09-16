import { Router } from "express";

import brandController from "../controllers/Brand.controller.js";
import { authJwtAdmin } from "../middleware/auth.jwt.js";

const brandRouter = Router();

brandRouter.get("/", brandController.getAllBrands);
brandRouter.get("/:brandId", brandController.getBrandById);
brandRouter.post("/", authJwtAdmin, brandController.createBrand);
brandRouter.delete("/:brandId", authJwtAdmin, brandController.deleteBrandById);
brandRouter.patch("/:brandId", authJwtAdmin, brandController.updateBrandById);

export default brandRouter;