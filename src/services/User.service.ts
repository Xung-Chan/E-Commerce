import bcrypt from "bcryptjs";
import userDao from "../daos/User.dao.js";
import { CreateUserDto } from "../dto/CreateUser.dto.js";
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
        return user;
    },
    banUserById: async (id: string): Promise<boolean> => {
        const result = await userDao.patchById(id, { status: "banned" });
        return result;
    },

    //! except password
    updateUserById: async (id: string, data: Partial<any>): Promise<boolean> => {
        const result = await userDao.patchById(id, data);
        return result;
    }


}
export default userService;
