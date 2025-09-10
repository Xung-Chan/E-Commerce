import { Router } from "express";
import brandController from "../controllers/Brand.controller.js";
import { authJwt } from "../middleware/auth.jwt.js";
const brandRouter = Router();
brandRouter.get("/", authJwt, brandController.getAllBrands);
export default brandRouter;