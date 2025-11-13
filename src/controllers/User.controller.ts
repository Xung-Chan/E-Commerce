import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { UpdateUserDto } from "../dto/Update.dto.js";
import userService from "../services/User.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";
import { tokenService } from "../services/Token.service.js";
import { get } from "mongoose";
import { ErrorDictionary } from "../middleware/errorDictionary.js";
const userController = {
    getAllUsers: expressAsyncHandler(async (req: Request, res: Response) => {
        const users = await userService.getAllUsers();
        res.status(200).json(new ApiResponse(true, 200, "Users fetched successfully", users));
    }),
    getUserById: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.userId;
        if (!userId) {
            throw new ApiError(400, "Bad Request", "User ID is required");
        }
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            throw new ApiError(401, "Unauthorized", "No token provided");
        }
        const payload = await tokenService.verifyToken(token);
        if (payload.userId !== userId && payload.role !== 'admin') {
            throw new ApiError(403, "Forbidden", "Access denied");
        }
        const user = await userService.getUserById(userId);
        res.status(200).json(new ApiResponse(true, 200, "User fetched successfully", user));
    }),


    //**Lấy thông tin cá nhân */
    getMyProfile: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        if (!userId) {
            throw new ApiError(401, "Unauthorized", ErrorDictionary.UNAUTHORIZED);
        }
        const user = await userService.getUserById(userId);
        res.status(200).json(new ApiResponse(true, 200, "User profile fetched successfully", user));
    }),


    updateUserById: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.userId;
        if (!userId) {
            throw new ApiError(400, "Bad Request", "User ID is required");
        }
        const { email, fullName } = req.body;
        const data: UpdateUserDto = {
            email, fullName
        };
        const result = await userService.updateUserById(userId, data);
        if (!result) {
            throw new ApiError(500, "Internal Server Error", "Failed to update user");
        }
        res.status(200).json(new ApiResponse(true, 200, "User updated successfully", result));
    }),
    banUserById: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.userId;
        if (!userId) {
            throw new ApiError(400, "Bad Request", "User ID is required");
        }
        const result = await userService.banUserById(userId);
        if (!result) {
            throw new ApiError(500, "Internal Server Error", "Failed to ban user");
        }
        res.status(200).json(new ApiResponse(true, 200, "User banned successfully", result));
    }),
    getMyAddresses: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        if (!userId) {
            throw new ApiError(401, "Unauthorized", "No token provided");
        }
        const addresses = await userService.getAddressesByUserId(userId);
        res.status(200).json(new ApiResponse(true, 200, "Addresses fetched successfully", addresses));
    }),
    addMyAddress: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        if (!userId) {
            throw new ApiError(401, "Unauthorized", "No token provided");
        }
        const { address } = req.body;
        if (!address) {
            throw new ApiError(400, "Bad Request", "Address is required");
        }
        const result = await userService.addAddressByUserId(userId, address);
        if (!result) {
            throw new ApiError(500, "Internal Server Error", "Failed to add address");
        }
        res.status(200).json(new ApiResponse(true, 200, "Address added successfully", result));
    }),
    removeMyAddressByAddressId: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        const addressId = req.params.addressId;
        if (!userId || !addressId) {
            throw new ApiError(400, "Bad Request", "User ID and Address ID are required");
        }
        const result = await userService.removeAddressById(userId, addressId);
        if (!result) {
            throw new ApiError(500, "Internal Server Error", "Failed to remove address");
        }
        res.status(200).json(new ApiResponse(true, 200, "Address removed successfully", result));
    }),
    updateMyAddressByAddressId: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        const addressId = req.params.addressId;
        if (!userId || !addressId) {
            throw new ApiError(400, "Bad Request", "User ID and Address ID are required");
        }
        const { address } = req.body;
        if (!address) {
            throw new ApiError(400, "Bad Request", "Address is required");
        }
        const result = await userService.updateAddressById(userId, addressId, address);
        if (!result) {
            throw new ApiError(500, "Internal Server Error", "Failed to update address");
        }
        res.status(200).json(new ApiResponse(true, 200, "Address updated successfully", result));
    }),
    getMyCart: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        if (!userId) {
            throw new ApiError(401, "Unauthorized", "No token provided");
        }
        const cart = await userService.getCartByUserId(userId);
        res.status(200).json(new ApiResponse(true, 200, "Cart fetched successfully", cart));
    }),
    addToCart: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        if (!userId) {
            throw new ApiError(401, "Unauthorized", "No token provided");
        }
        const { variantId, quantity } = req.body;
        if (!variantId || !quantity) {
            throw new ApiError(400, "Bad Request", "Variant ID and Quantity are required");
        }
        const result = await userService.addToCartByUserId(userId, variantId, quantity);
        res.status(200).json(new ApiResponse(true, 200, "Product added to cart successfully", result));
    }),
    updateMyCartByCartItemId: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        if (!userId) {
            throw new ApiError(401, "Unauthorized", ErrorDictionary.UNAUTHORIZED);
        }
        const cartItemId = req.params.cartItemId;
        if (!cartItemId) {
            throw new ApiError(400, "Bad Request", ErrorDictionary.CART_ITEM_NOT_FOUND);
        }
        const { quantity, variantId } = req.body;
        if (quantity === undefined) {
            throw new ApiError(400, "Bad Request", ErrorDictionary.QUANTITY_REQUIRED);
        }
        if (!variantId) {
            throw new ApiError(400, "Bad Request", ErrorDictionary.VARIANT_REQUIRED);
        }
        const result = await userService.updateCartByCartItemId(cartItemId, variantId, quantity);
        res.status(200).json(new ApiResponse(true, 200, "Cart updated successfully", result));
    }),
    removeMyCartByCartItemId: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId
        if (!userId) {
            throw new ApiError(401, "Unauthorized", "No token provided");
        }
        const cartItemId = req.params.cartItemId;
        if (!cartItemId) {
            throw new ApiError(400, "Bad Request", "Cart Item ID is required");
        }
        const result = await userService.deleteCartByCartItemId(cartItemId);
        res.status(200).json(new ApiResponse(true, 200, "Cart item removed successfully", result));
    }),
}
export default userController;
