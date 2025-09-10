import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import tokenDao from "../daos/Token.dao.js";
export const tokenService = {
    generateTokens: (payload: object) => {
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        return { accessToken, refreshToken };
    },
    saveToken: async (userId: string, token: string) => {
        await tokenDao.create({ userId, token });
    },


}