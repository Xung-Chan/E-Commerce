import ApiError from "../utils/ApiError.js";
import { NextFunction, Request, Response } from "express";
import { tokenService } from "../services/Token.service.js";


export const authAnonymous = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            next();
            return;
        }
        const decoded = await tokenService.verifyToken(token);
        if (decoded.type !== 'access') {
            next();
            return;
        }
        (req as any).userId = decoded.userId;
        next();
    } catch (error) {
        next();
    }
}

export const authJwt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            throw new ApiError(401, "Unauthorized", "Token không được cung cấp");
        }
        const decoded = await tokenService.verifyToken(token);
        if (decoded.type !== 'access') {
            throw new ApiError(403, "Forbidden", "Yêu cầu token truy cập");
        }
        (req as any).userId = decoded.userId;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized", "Token không hợp lệ");
    }
}

export const authJwtAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            throw new ApiError(401, "Unauthorized", "Token không được cung cấp");
        }
        const decoded = await tokenService.verifyToken(token);
        if (decoded.type !== 'access') {
            throw new ApiError(403, "Forbidden", "Yêu cầu token truy cập");
        }
        if (decoded.role !== 'admin') {
            throw new ApiError(403, "Forbidden", "Yêu cầu quyền truy cập admin");
        }
        (req as any).userId = decoded.userId;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized", "Token không hợp lệ");
    }
}


export const isLoggedIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            (req as any).isLoggedIn = false;
            (req as any).userId = "anonymous";
            return next();
        }
        const decoded = await tokenService.verifyToken(token);
        if (decoded.type !== 'access') {
            (req as any).isLoggedIn = false;
            return next();
        }
        (req as any).isLoggedIn = true;
        (req as any).userId = decoded.userId;
        next();
    } catch (error) {
        (req as any).isLoggedIn = false;
        next();
    }
}
