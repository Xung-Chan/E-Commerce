import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { IUser, userDao } from "../daos/User.dao.js";
import { CreateUserDto } from "../dto/Create.dto.js";
import { LoginResponseDto } from "../dto/Response.dto.js";
import ApiError from "../utils/ApiError.js";
import { TokenPayload } from "../utils/jwt.js";
import { sendMail } from "./Mail.service.js";
import { tokenService } from "./Token.service.js";
import { LoginRequest } from "../dto/Request.dto.js";
const authService = {
    login: async (data: LoginRequest): Promise<LoginResponseDto> => {
        const result = await userDao.findBy({ email: data.email });
        if (result.length === 0) {
            throw new ApiError(404, "Not Found", "User not found");
        }
        const user = result[0];
        const isMatch = await bcrypt.compareSync(data.password, user.password);
        if (!isMatch) {
            throw new ApiError(401, "Unauthorized", "Invalid password");
        }

        const { accessToken, refreshToken } = tokenService.generateTokens({ userId: user.id, email: user.email, role: user.role });
        await tokenService.saveToken(user.id, refreshToken);
        return new LoginResponseDto(accessToken, refreshToken);
    },
    register: async (userData: CreateUserDto): Promise<any> => {
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedPassword;
        const user = await userDao.create(userData);
        return user;
    }
    ,
    forgotPassword: async (email: string): Promise<void> => {
        const result = await userDao.findBy({ email });
        if (result.length === 0) {
            throw new ApiError(404, "Not Found", "User not found");
        }
        const user = result[0];
        const payload: TokenPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            type: 'reset'
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '15m' });
        const link = `${process.env.BASE_URL}/auth/reset-password?token=${token}`;
        await tokenService.saveToken(user.id, token);
        sendMail(email, link);
    },
    resetPassword: async (token: string, newPassword: string): Promise<void> => {
        try {
            const payload: TokenPayload = tokenService.verifyToken(token);
            if (payload.type !== 'reset') {
                throw new ApiError(400, "Bad Request", "Invalid token type");
            }
            const userId = payload.userId;
            const tokenInstance = await tokenService.findToken({ userId, token, isUsed: false });
            if (!tokenInstance) {
                throw new ApiError(401, "Unauthorized", "Invalid or expired token");
            }
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            const result = await userDao.patchById(userId, { password: hashedPassword });
            await tokenService.markUsedToken(tokenInstance._id);
            if (!result) {
                throw new ApiError(500, "Internal Server Error", "Failed to update password");
            }
        } catch (err) {
            throw new ApiError(400, "Bad Request", "Invalid or expired token");
        }
    },
    changePassword: async (userId: string, oldPassword: string, newPassword: string): Promise<boolean> => {
        const user = await userDao.readById(userId);
        if (!user) {
            throw new ApiError(404, "Not Found", "User not found");
        }
        const isMatch = await bcrypt.compareSync(oldPassword, user.password);
        if (!isMatch) {
            throw new ApiError(401, "Unauthorized", "Invalid old password");
        }
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        const result = await userDao.patchById(userId, { password: hashedPassword });
        return result;
    },
    refreshToken: async (refreshToken: string): Promise<LoginResponseDto> => {
        try {
            const tokenPayload = tokenService.verifyToken(refreshToken);
            if (tokenPayload.type !== 'refresh') {
                throw new ApiError(400, "Bad Request", "Invalid token type");
            }
            const userId = tokenPayload.userId;
            const tokenInstance = await tokenService.findToken({ userId, token: refreshToken, isUsed: false });
            if (!tokenInstance) {
                throw new ApiError(401, "Unauthorized", "Invalid refresh token");
            }
            const { accessToken, refreshToken: newRefreshToken } = tokenService.generateTokens(tokenPayload);
            await tokenService.saveToken(userId, newRefreshToken);
            await tokenService.markUsedToken(tokenInstance._id);
            return new LoginResponseDto(accessToken, newRefreshToken);

        } catch (err) {
            throw new ApiError(400, "Bad Request", "Invalid or expired refresh token");
        }
    }

}
export default authService;
