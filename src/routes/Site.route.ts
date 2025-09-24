import { Router } from "express";
import siteController from "../controllers/Site.controller.js";
import productRouter from "./Product.route.js";
import { isLoggedIn } from "../middleware/authJwt.middleware.js";
const siteRouter = Router();
//landing Page
siteRouter.get("/", isLoggedIn, siteController.home);

// Login
siteRouter.get('/login', isLoggedIn, siteController.login);
siteRouter.post('/login', siteController.loginPost);

// Logout
siteRouter.get('/logout', siteController.logout);
siteRouter.post('/logout', siteController.logout);

// Register
siteRouter.get('/register', isLoggedIn, siteController.register);
siteRouter.post('/register', siteController.registerPost);

// Profile
siteRouter.get('/profile', isLoggedIn, siteController.profile);

// Catalog
siteRouter.get('/catalog', isLoggedIn, siteController.catalog);

// Product details
siteRouter.get('/product/:productId', isLoggedIn, siteController.product);

export default siteRouter;