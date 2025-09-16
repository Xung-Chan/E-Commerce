import { Router } from "express";
import authController from "../controllers/Auth.controller.js";
const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password", authController.resetPassword);
authRouter.post("/refresh-token", authController.refreshToken);

export default authRouter;