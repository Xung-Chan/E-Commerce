import bcrypt from "bcryptjs";
import { IUser, userDao } from "../daos/User.dao.js";
import { CreateUserDto } from "../dto/Create.dto.js";
import { UpdateUserDto } from "../dto/Update.dto.js";
import ApiError from "../utils/ApiError.js";
import { productDao } from "../daos/Product.dao.js";
import { cartItemDao, ICartItem } from "../daos/CartItem.dao.js";
import { variantDao } from "../daos/Variant.dao.js";
import { CartResponse } from "../dto/Response.dto.js";
import { ErrorDictionary } from "../middleware/errorDictionary.js";
const userService = {
    createUser: async (data: CreateUserDto): Promise<boolean> => {
        const user = await userDao.create({
            email: data.email, password: null, fullName: data.fullName, address: data.address
        })

        return !!user

    },

    getAllUsers: async (): Promise<any[]> => {
        const users = await userDao.list();
        return users;
    },


    getUserById: async (id: string): Promise<any | null> => {
        const user = await userDao.readById(id);
        if (!user) {
            throw new ApiError(404, "Not Found", ErrorDictionary.USER_NOT_FOUND);
        }
        return {
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            addresses: user.addresses,
        };
    },


    banUserById: async (id: string): Promise<boolean> => {
        const result = await userDao.patchById(id, { status: "banned" });
        return result;
    },

    updateUserById: async (id: string, data: UpdateUserDto): Promise<boolean> => {
        const result = await userDao.patchById(id, data);
        return result;

    },


    getAddressesByUserId: async (userId: string): Promise<any[]> => {
        const user: IUser | null = await userDao.readById(userId);

        if (!user) {
            throw new ApiError(404, "Not Found", "User not found");
        }

        return user.addresses;
    },


    addAddressByUserId: async (userId: string, address: string): Promise<boolean> => {
        const user: IUser | null = await userDao.readById(userId);
        if (!user) {
            throw new ApiError(404, "Not Found", "User not found");
        }
        user.addresses.push({ address });
        const result = await userDao.patchById(userId, { addresses: user.addresses });
        return result;

    },
    removeAddressById: async (userId: string, addressId: string): Promise<boolean> => {
        const user: IUser | null = await userDao.readById(userId);
        if (!user) {
            throw new ApiError(404, "Not Found", "User not found");
        }
        const addresses = user.addresses.filter(a => a._id?.toString() !== addressId);
        user.addresses.splice(0, user.addresses.length, ...addresses);
        const result = await userDao.patchById(userId, { addresses: user.addresses });
        return result;

    },


    updateAddressById: async (userId: string, addressId: string, newAddress: string): Promise<boolean> => {
        const user: IUser | null = await userDao.readById(userId);
        if (!user) {
            throw new ApiError(404, "Not Found", "User not found");
        }
        const address = user.addresses.find(a => a._id?.toString() === addressId);
        if (!address) {
            throw new ApiError(404, "Not Found", "Address not found");
        }
        address.address = newAddress;
        const result = await userDao.patchById(userId, { addresses: user.addresses });
        return result;
    },


    getCartByUserId: async (userId: string): Promise<CartResponse> => {
        const user: IUser | null = await userDao.readById(userId);
        if (!user) {
            throw new ApiError(404, "Not Found", "User not found");
        }
        const cart = await cartItemDao.findBy({ userId: userId });
        if (!cart) {
            return { items: [], total: 0 };
        }
        const items = await Promise.all(
            cart.map(async (item: ICartItem) => {
                const variant = await variantDao.readById(item.variantId.toString());
                if (!variant) {
                    throw new ApiError(404, "Not Found", "Variant not found");
                }
                const product = await productDao.readById(variant.productId.toString());
                if (!product) {
                    throw new ApiError(404, "Not Found", "Product not found");
                }
                return {
                    cartItemId: item._id.toString(),
                    variantId: variant._id.toString(),
                    productId: product._id.toString(),
                    product: product.name,
                    variant: variant.distinctFeature,
                    quantity: item.quantity,
                };
            })
        );

        return {
            items: [...items],
            total: items.reduce((sum, item) => sum + item.quantity, 0),
        };
    },
    addToCartByUserId: async (userId: string, variantId: string, quantity: number): Promise<boolean> => {
        const user: IUser | null = await userDao.readById(userId);
        if (!user) {
            throw new ApiError(404, "Not Found", "User not found");
        }
        const variant = await variantDao.readById(variantId);
        if (!variant) {
            throw new ApiError(404, "Not Found", "Variant not found");
        }
        let cartItem = await cartItemDao.findOne({ userId: userId, variantId: variantId });
        if (cartItem) {
            cartItem.quantity += quantity;
            const result = await cartItemDao.updateById(cartItem._id.toString(), { quantity: cartItem.quantity });
            return result;
        }
        else {
            cartItem = await cartItemDao.create({ userId: userId, variantId: variantId, quantity: quantity });
            return !!cartItem;
        }
    },
    updateCartByCartItemId: async (cartItemId: string, quantity: number): Promise<boolean> => {
        const cartItem = await cartItemDao.readById(cartItemId);
        if (!cartItem) {
            throw new ApiError(404, "Not Found", "Cart item not found");
        }
        const result = await cartItemDao.updateById(cartItemId, { quantity });
        if (!result) {
            throw new ApiError(500, "Internal Server Error", "Failed to update cart item");
        }
        return result;
    },
    deleteCartByCartItemId: async (cartItemId: string): Promise<boolean> => {
        const cartItem = await cartItemDao.readById(cartItemId);
        if (!cartItem) {
            throw new ApiError(404, "Not Found", "Cart item not found");
        }
        const result = await cartItemDao.deleteById(cartItemId);
        if (!result) {
            throw new ApiError(500, "Internal Server Error", "Failed to delete cart item");
        }
        return result;
    },

};
export default userService;
