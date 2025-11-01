import multer from 'multer';
import { MongoServerError } from "mongodb";
import { Request, Response, NextFunction } from 'express';

import ApiError from '../utils/ApiError.js';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof ApiError) {
        res.status(err.statusCode || 500).json(err.json())
    }
    else if (err instanceof multer.MulterError) {

        res.status(400).json({
            success: false,
            status: 400,
            title: "File Upload Error",
            message: err.message,
            stack: err.stack
        });
    }
    else if (err instanceof MongoServerError) {
        res.status(500).json({
            success: false,
            status: parseInt(err.code?.toString() || "500"),
            title: "Duplicate Key Error",
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