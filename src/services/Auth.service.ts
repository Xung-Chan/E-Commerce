import bcrypt from "bcryptjs";
import userDao from "../daos/User.dao";
import { CreateUserDto } from "../dto/CreateUser.dto";
import LoginResponseDto from "../dto/LoginResponse.dto";
import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Resend } from "resend";
import { reset_mail_template } from "../utils/constant";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { tokenService } from "./Token.service";
import tokenDao from "../daos/Token.dao";
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

        const { accessToken, refreshToken } = tokenService.generateTokens({ id: user.id, email: user.email });
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
        const token = jwt.sign({
            userId: user.id,
        }, process.env.SECRET_KEY as string, { expiresIn: '15m' });
        const link = `${process.env.BASE_URL}/auth/reset-password?token=${token}`;
        await tokenService.saveToken(user.id, token);
        const resend = new Resend(process.env.MAIL_TOKEN as string);
        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Reset Password Request',
            html: reset_mail_template(email, link),
        });
    },
    resetPassword: async (token: string, newPassword: string): Promise<void> => {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { userId: string };

            const userId = decoded.userId;
            const isValidated = await tokenDao.findBy({ userId, token, isUsed: false });
            if (!isValidated) {
                throw new ApiError(401, "Unauthorized", "Invalid or expired token");
            }
            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            const result = await userDao.patchById(userId, { password: hashedPassword });
            await tokenDao.patchById(isValidated._id, { isUsed: true });
            if (!result) {
                throw new ApiError(500, "Internal Server Error", "Failed to update password");
            }
        } catch (err) {
            throw new ApiError(400, "Bad Request", "Invalid or expired token");
        }
    },
    refreshToken: async (refreshToken: string): Promise<LoginResponseDto> => {
        try {
            const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY as string) as { id: string, email: string };
            const userId = decoded.id;
            const isValidated = await tokenDao.findBy({ userId, token: refreshToken, isUsed: false });
            if (!isValidated) {
                throw new ApiError(401, "Unauthorized", "Invalid refresh token");
            }
            const { accessToken, refreshToken: newRefreshToken } = tokenService.generateTokens({ id: decoded.id, email: decoded.email });
            await tokenService.saveToken(userId, newRefreshToken);
            await tokenDao.patchById(isValidated._id, { isUsed: true });
            return new LoginResponseDto(accessToken, newRefreshToken);

        } catch (err) {
            throw new ApiError(400, "Bad Request", "Invalid or expired refresh token");
        }
    }

}
export default authService;
