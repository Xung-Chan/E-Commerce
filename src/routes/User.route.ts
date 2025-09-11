import express from "express";
import userController from "../controllers/User.controller.js";
import { authJwt } from "../middleware/auth.jwt.js";
const userRouter = express.Router();
// getall
userRouter.get("/", authJwt, userController.getAllUsers);
//get single
userRouter.get("/:userId", userController.getUserById);
//update
userRouter.patch("/:userId", userController.updateUserById);
//ban
userRouter.patch("/:userId/ban", userController.banUserById);

export default userRouter;