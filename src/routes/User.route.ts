import express from "express";
import userController from "../controllers/User.controller.js";
import { authJwt } from "../middleware/authJwt.middleware.js";
const userRouter = express.Router();

userRouter.get("/", authJwt, userController.getAllUsers);
userRouter.get("/:userId", authJwt, userController.getUserById);
userRouter.patch("/:userId", authJwt, userController.updateUserById);
userRouter.patch("/ban/:userId", authJwt, userController.banUserById);
userRouter.get("/profile/me", authJwt, userController.getMyProfile);

userRouter.get("/addresses/me", authJwt, userController.getMyAddresses);
userRouter.post("/addresses/me", authJwt, userController.addMyAddress);
userRouter.delete("/addresses/me/:addressId", authJwt, userController.removeMyAddressByAddressId);
userRouter.patch("/addresses/me/:addressId", authJwt, userController.updateMyAddressByAddressId);

userRouter.get("/cart/me", authJwt, userController.getMyCart);
userRouter.post("/cart/me", authJwt, userController.addToCart);
userRouter.patch("/cart/me/:cartItemId", authJwt, userController.updateMyCartByCartItemId);
userRouter.delete("/cart/me/:cartItemId", authJwt, userController.removeMyCartByCartItemId);
export default userRouter;