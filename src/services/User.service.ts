import bcrypt from "bcryptjs";
import { IUser, userDao } from "../daos/User.dao.js";
import { CreateUserDto } from "../dto/Create.dto.js";
import { UpdateUserDto } from "../dto/Update.dto.js";
import ApiError from "../utils/ApiError.js";
import { productDao } from "../daos/Product.dao.js";
import { cartItemDao, ICartItem } from "../daos/CartItem.dao.js";
const userService = {
    createUser: async (data: CreateUserDto): Promise<boolean> => {
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        const user = await userDao.create({
            email: data.email, password: hashedPassword, fullName: data.fullName, address: data.address
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
            throw new ApiError(404, "Not Found", "User not found");
        }
        return user;
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
    getCartByUserId: async (userId: string): Promise<any[]> => {
        const user: IUser | null = await userDao.readById(userId);
        if (!user) {
            throw new ApiError(404, "Not Found", "User not found");
        }
        const cart = await cartItemDao.findBy({ userId: userId, isPaid: false });
        if (!cart) {
            return [];
        }
        const cartWithProducts = await Promise.all(
            cart.map(async (item: ICartItem) => {
                const product = await productDao.readById(item.productId.toString());
                if (!product) {
                    throw new ApiError(404, "Not Found", "Product not found");
                }
                const variant = product.variants.find(v => v._id?.toString() === item.variantId.toString());
                if (!variant) {
                    throw new ApiError(404, "Not Found", "Variant not found");
                }
                return {
                    cartItemId: item._id,
                    variantId: item.variantId,
                    productId: item.productId,
                    product: product.name,
                    variant: variant.distinctFeature,
                    quantity: item.quantity,
                };
            })

        );
        return cartWithProducts;
    },
    addToCartByUserId: async (userId: string, productId: string, variantId: string, quantity: number): Promise<boolean> => {
        const user: IUser | null = await userDao.readById(userId);
        if (!user) {
            throw new ApiError(404, "Not Found", "User not found");
        }
        const product = await productDao.readById(productId);
        if (!product) {
            throw new ApiError(404, "Not Found", "Product not found");
        }
        const variant = product.variants.find(v => v._id?.toString() === variantId);
        if (!variant) {
            throw new ApiError(404, "Not Found", "Variant not found");
        }
        let cartItem = await cartItemDao.findOne({ userId: userId, productId: productId, variantId: variantId, isPaid: false });
        if (cartItem) {
            cartItem.quantity += quantity;
            const result = await cartItemDao.updateById(cartItem._id.toString(), { quantity: cartItem.quantity });
            return result;
        }
        else {
            cartItem = await cartItemDao.create({ userId: userId, productId: productId, variantId: variantId, quantity: quantity });
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
