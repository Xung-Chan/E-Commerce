import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import { tokenService } from "../services/Token.service.js";
export const authJwt = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            throw new ApiError(401, "Unauthorized", "No token provided");
        }
        const decoded = tokenService.verifyToken(token);
        if (decoded.type !== 'access') {
            throw new ApiError(403, "Forbidden", "Access token required");
        }
        (req as any).userId = decoded.userId;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized", "Invalid token");
    }
}
export const authJwtAdmin = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            throw new ApiError(401, "Unauthorized", "No token provided");
        }
        const decoded = tokenService.verifyToken(token);
        if (decoded.type !== 'access') {
            throw new ApiError(403, "Forbidden", "Access token required");
        }
        if (decoded.role !== 'admin') {
            throw new ApiError(403, "Forbidden", "Admin access required");
        }
        (req as any).userId = decoded.userId;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized", "Invalid token");
    }
}
export const isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
        console.log('Token log from middleware: ' + token);
        if (!token) {
            (req as any).isLoggedIn = false;
            return next();
        }
        const decoded = tokenService.verifyToken(token);
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
