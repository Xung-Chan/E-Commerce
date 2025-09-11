import { Router } from "express";
import siteController from "../controllers/Site.controller";
const siteRouter = Router();
//landing Page
siteRouter.get("/", siteController.home);

// Login
siteRouter.get('/login', siteController.login);

// Register
siteRouter.get('/register', siteController.register);

// Catalog
siteRouter.get('/catalog', siteController.catalog);
export default siteRouter;