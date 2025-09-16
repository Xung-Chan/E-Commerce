import { Router } from "express";
import categoryController from "../controllers/Category.controller.js";
import { authJwt, authJwtAdmin } from "../middleware/auth.jwt.js";
const categoryRouter = Router();
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:categoryId", categoryController.getCategoryById);
categoryRouter.post("/", authJwtAdmin, categoryController.createCategory);
categoryRouter.delete("/:categoryId", authJwtAdmin, categoryController.deleteCategoryById);

export default categoryRouter;