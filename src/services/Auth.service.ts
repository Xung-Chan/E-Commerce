import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";

import ApiError from "../utils/ApiError.js";
import { sendMail } from "./Mail.service.js";
import { userDao } from "../daos/User.dao.js";
import { TokenPayload } from "../utils/jwt.js";
import { tokenService } from "./Token.service.js";
import { CreateUserDto } from "../dto/Create.dto.js";
import { LoginRequest } from "../dto/Request.dto.js";
import { LoginResponseDto } from "../dto/Response.dto.js";
import { ErrorDictionary } from "../middleware/errorDictionary.js";


function generateTemporaryPassword(): string {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const digits = '0123456789';
    let password = '';
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += special[Math.floor(Math.random() * special.length)];
    const all = upper + lower + special + digits;
    for (let i = 3; i < 8; i++) {
        password += all[Math.floor(Math.random() * all.length)];
    }
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}

const authService = {
    login: async (data: LoginRequest): Promise<LoginResponseDto> => {
        const result = await userDao.findBy({ email: data.email });
        if (result.length === 0) {
            throw new ApiError(404, "Not Found", "Tài khoản không tồn tại");
        }
        const user = result[0];
        const isMatch = await bcrypt.compareSync(data.password, user.password);
        if (!isMatch) {
            throw new ApiError(401, "Unauthorized", "Mật khẩu không đúng");
        }

        const { accessToken, refreshToken } = tokenService.generateTokens({ userId: user.id, email: user.email, role: user.role });
        await tokenService.saveToken(user.id, refreshToken);
        return new LoginResponseDto(accessToken, refreshToken);
    },


    register: async (userData: CreateUserDto): Promise<any> => {
        const temporaryPassword = generateTemporaryPassword();
        console.log("Temporary Password:", temporaryPassword);
        const hashedPassword = bcrypt.hashSync(temporaryPassword, 10);
        userData.password = hashedPassword;
        const user = await userDao.create(userData);
        const payload: TokenPayload = {
            userId: user._id.toString(),
            email: user.email,
            role: "user",
            type: 'reset'
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '5m' });
        console.log(token);
        const link = `${process.env.BASE_URL}/reset-password?token=${token}`;
        await tokenService.saveToken(user._id.toString(), token);
        sendMail(user.email, link, "register", { template_password: temporaryPassword });
        return user;
    },


    forgotPassword: async (email: string): Promise<void> => {
        const result = await userDao.findBy({ email });
        if (result.length === 0) {
            throw new ApiError(404, "Not Found", "Tài khoản không tồn tại");
        }
        const user = result[0];
        const payload: TokenPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            type: 'reset'
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '5m' });
        console.log(token);
        const link = `${process.env.BASE_URL}/reset-password?token=${token}`;
        await tokenService.saveToken(user.id, token);
        sendMail(email, link, "reset");
    },


    resetPassword: async (token: string, newPassword: string): Promise<void> => {
        try {
            const payload: TokenPayload = await tokenService.verifyToken(token);
            if (payload.type !== 'reset') {
                throw new ApiError(400, "Bad Request", ErrorDictionary.INVALID_TOKEN_TYPE);
            }
            const userId = payload.userId;
            const tokenInstance = await tokenService.findToken({ userId, token, isUsed: false });
            if (!tokenInstance) {
                throw new ApiError(401, "Unauthorized", ErrorDictionary.INVALID_OR_EXPIRED_TOKEN);
            }
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            const result = await userDao.patchById(userId, { password: hashedPassword });
            await tokenService.markUsedToken(tokenInstance._id);
            if (!result) {
                throw new ApiError(500, "Internal Server Error", ErrorDictionary.PASSWORD_UPDATE_FAILED);
            }
        } catch (err) {
            throw new ApiError(400, "Bad Request", ErrorDictionary.INVALID_OR_EXPIRED_TOKEN);
        }
    },


    changePassword: async (userId: string, oldPassword: string, newPassword: string): Promise<boolean> => {
        const user = await userDao.readById(userId);
        if (!user) {
            throw new ApiError(404, "Not Found", ErrorDictionary.USER_NOT_FOUND);
        }
        const isMatch = await bcrypt.compareSync(oldPassword, user.password);
        if (!isMatch) {
            throw new ApiError(401, "Unauthorized", ErrorDictionary.INVALID_OLD_PASSWORD);
        }
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        const result = await userDao.patchById(userId, { password: hashedPassword });
        return result;
    },


    refreshToken: async (refreshToken: string): Promise<LoginResponseDto> => {
        console.log(refreshToken);
        try {
            const tokenPayload: TokenPayload = await tokenService.verifyToken(refreshToken);
            if (tokenPayload.type !== 'refresh') {
                throw new ApiError(400, "Bad Request", ErrorDictionary.INVALID_TOKEN_TYPE);
            }
            const userId = tokenPayload.userId;
            const tokenInstance = await tokenService.findToken({ userId, token: refreshToken, isUsed: false });
            if (!tokenInstance) {
                throw new ApiError(401, "Unauthorized", ErrorDictionary.INVALID_OR_EXPIRED_TOKEN);
            }
            const { accessToken, refreshToken: newRefreshToken } = tokenService.generateTokens({
                userId: tokenPayload.userId,
                email: tokenPayload.email,
                role: tokenPayload.role
            });
            await tokenService.saveToken(userId, newRefreshToken);
            await tokenService.markUsedToken(tokenInstance._id);
            return new LoginResponseDto(accessToken, newRefreshToken);

        } catch (err) {
            console.error(err);
            throw new ApiError(400, "Bad Request", ErrorDictionary.INVALID_OR_EXPIRED_TOKEN);
        }
    }

}
export default authService;
