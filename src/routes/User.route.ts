import express from "express";
import userController from "../controllers/User.controller.js";
import { authJwt } from "../middleware/authJwt.middleware.js";
const userRouter = express.Router();

userRouter.get("/", authJwt, userController.getAllUsers);
userRouter.get("/:userId", authJwt, userController.getUserById);
userRouter.patch("/:userId", authJwt, userController.updateUserById);
userRouter.patch("/ban/:userId", authJwt, userController.banUserById);
userRouter.get("/profile/me", authJwt, userController.getMyProfile);
userRouter.get("/:userId/addresses", authJwt, userController.getAddressesByUserId);
userRouter.post("/:userId/addresses", authJwt, userController.addAddressByUserId);
userRouter.delete("/:userId/addresses/:addressId", authJwt, userController.removeAddressById);
userRouter.patch("/:userId/addresses/:addressId", authJwt, userController.updateAddressById);

export default userRouter;