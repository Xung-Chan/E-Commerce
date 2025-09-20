import bcrypt from "bcryptjs";
import { IUser, userDao } from "../daos/User.dao.js";
import { CreateUserDto } from "../dto/Create.dto.js";
import { UpdateUserDto } from "../dto/Update.dto.js";
import ApiError from "../utils/ApiError.js";
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
    }
};
export default userService;
