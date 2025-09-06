import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof ApiError) {
        res.status(err.statusCode || 500).json(err.json())
    }
    else {
        res.status(500).json({
            success: false,
            status: 500,
            title: "Internal Server Error",
            message: err.message,
            stack: err.stack
        });
    }
}

export default errorHandler;