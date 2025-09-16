import { Router } from "express";
import categoryController from "../controllers/Category.controller.js";
import { authJwt, authJwtAdmin } from "../middleware/authJwt.middleware.js";
import { uploadSingle } from "../middleware/multer.middleware.js";
const categoryRouter = Router();
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:categoryId", categoryController.getCategoryById);
categoryRouter.post("/", authJwtAdmin, uploadSingle, categoryController.createCategory);
categoryRouter.delete("/:categoryId", authJwtAdmin, categoryController.deleteCategoryById);

export default categoryRouter;