import { Router } from "express";
import siteController from "../controllers/Site.controller.js";
import productRouter from "./Product.route.js";
import { isLoggedIn } from "../middleware/authJwt.middleware.js";
const siteRouter = Router();
//landing Page
siteRouter.get("/", siteController.home);

// Login
siteRouter.get('/login', isLoggedIn, siteController.login);

// Register
siteRouter.get('/register', siteController.register);

// Catalog
siteRouter.get('/catalog', siteController.catalog);



siteRouter.get("/product/:productSlug", siteController.productBySlug);
productRouter.get("/product/:productSlug/:variantSlug", siteController.productBySlug);
export default siteRouter;