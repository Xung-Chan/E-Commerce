import { tokenDao } from "../daos/Token.dao.js";
import { userDao } from "../daos/User.dao.js";
import ApiError from "../utils/ApiError.js";
import { TokenPayload } from "../utils/jwt.js";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY as string;
const generateAccessToken = (payload: TokenPayload): string => {
    payload.type = 'access';
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
};
const generateRefreshToken = (payload: TokenPayload): string => {
    payload.type = 'refresh';
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
};
export const tokenService = {

    generateTokens: (payload: TokenPayload) => {
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        return { accessToken, refreshToken };
    },
    saveToken: async (userId: string, token: string) => {
        await tokenDao.create({ userId, token });
    },
    removeToken: async (id: string) => {
        return tokenDao.deleteById(id);
    },
    findToken: async (data: Partial<{
        token: string;
        userId: string;
        isUsed: boolean;
    }>) => {
        return tokenDao.findBy(data);
    },
    markUsedToken: async (id: string) => {
        return tokenDao.patchById(id, { isUsed: true });
    },
    verifyToken: async (token: string): Promise<TokenPayload> => {
        const payload = jwt.verify(token, SECRET_KEY) as TokenPayload;
        const user = await userDao.findBy({ id: payload.userId });
        if (!user) {
            throw new ApiError(401, "Unauthorized", "User not found");
        }
        return payload;
    },


}