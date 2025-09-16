import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError.js';
import multer from 'multer';
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof ApiError) {
        res.status(err.statusCode || 500).json(err.json())
    }
    else if (err instanceof multer.MulterError) {

        res.status(400).json({
            success: false,
            status: 400,
            title: err.code,
            message: err.message,
            stack: err.stack
        });
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