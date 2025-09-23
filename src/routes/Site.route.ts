import { Router } from "express";
import siteController from "../controllers/Site.controller.js";
import productRouter from "./Product.route.js";
const siteRouter = Router();
//landing Page
siteRouter.get("/", siteController.home);

// Login
siteRouter.get('/login', siteController.login);

// Register
siteRouter.get('/register', siteController.register);

// Catalog
siteRouter.get('/catalog', siteController.catalog);

// Product details
siteRouter.get('/product/:productId', siteController.product);

export default siteRouter;