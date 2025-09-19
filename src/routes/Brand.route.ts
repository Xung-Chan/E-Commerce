import { Router } from "express";

import brandController from "../controllers/Brand.controller.js";
import { authJwtAdmin } from "../middleware/authJwt.middleware.js";
import { uploadSingle } from "../middleware/multer.middleware.js";

const brandRouter = Router();

brandRouter.get("/", brandController.getAllBrands);
brandRouter.get("/:brandId", brandController.getBrandById);
brandRouter.post("/", authJwtAdmin, uploadSingle, brandController.createBrand);
brandRouter.delete("/:brandId", authJwtAdmin, brandController.deleteBrandById);
brandRouter.patch("/:brandId", authJwtAdmin, brandController.updateBrandById);

export default brandRouter;