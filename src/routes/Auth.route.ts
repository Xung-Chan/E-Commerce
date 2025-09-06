import { Router } from "express";
import authController from "../controllers/Auth.controller";
const authRouter = Router();
authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password", authController.resetPassword);
export default authRouter;