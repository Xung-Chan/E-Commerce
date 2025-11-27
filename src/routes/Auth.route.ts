import { Router } from "express";
import authController from "../controllers/Auth.controller.js";
import { authJwt } from "../middleware/authJwt.middleware.js";
import { upload } from "../services/Image.service.js";

const authRouter = Router();
authRouter.post("/login", upload.none(), authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/activate-account", authController.activateAccount);
authRouter.post("/reset-password", authController.resetPassword);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.post("/change-password", authJwt, authController.changePassword);
export default authRouter;