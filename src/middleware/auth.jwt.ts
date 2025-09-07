import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import { verifyToken } from "../utils/jwt";
import { TokenExpiredError } from "jsonwebtoken";
export const authJwt = (req: Request, res: Response, next: NextFunction): void => {
    try {

        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            throw new ApiError(401, "Unauthorized", "No token provided");
        }
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (error) {

        throw new ApiError(401, "Unauthorized", "Invalid token");
    }
}