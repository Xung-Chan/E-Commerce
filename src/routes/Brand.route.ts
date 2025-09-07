import { Router } from "express";
import brandController from "../controllers/Brand.controller";
import { authJwt } from "../middleware/auth.jwt";
const brandRouter = Router();
brandRouter.get("/", authJwt, brandController.getAllBrands);
export default brandRouter;