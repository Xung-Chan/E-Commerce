import jwt from 'jsonwebtoken';
export const generateAccessToken = (payload: object): string => {
    return jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '15m' });
};
export const generateRefreshToken = (payload: object): string => {
    return jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '7d' });
};
export const verifyToken = (token: string): object | string => {
    return jwt.verify(token, process.env.SECRET_KEY as string) as { userId: string };
};

