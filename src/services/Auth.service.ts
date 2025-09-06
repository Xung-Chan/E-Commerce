import userDao from "../daos/User.dao";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError";
import { CreateUserDto } from "../dto/CreateUser.dto";
import LoginResponseDto from "../dto/LoginResponse.dto";
const authService = {
    login: async (email: string, password: string): Promise<LoginResponseDto> => {
        const result = await userDao.findBy({ email });
        if (result.length === 0) {
            throw new ApiError(404, "Not Found", "User not found");
        }
        const user = result[0];
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new ApiError(401, "Unauthorized", "Invalid password");
        }

        return new LoginResponseDto("access-token", "refresh-token");
    },
    register: async (userData: CreateUserDto): Promise<any> => {
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedPassword;
        const user = await userDao.create(userData);
        return user;
    }
    ,
    forgotPassword: async (email: string): Promise<void> => {

    }
}
export default authService;
