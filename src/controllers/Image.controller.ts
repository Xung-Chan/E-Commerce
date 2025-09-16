import { Request, Response } from 'express';
import { MulterError } from 'multer';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/Api.response';
const imageController = {
    uploadImage: async (req: Request, res: Response) => {
        if (!req.file) {
            throw new ApiError(400, 'Upload failed', "No file provided");
        }
        res.status(200).json(new ApiResponse(true, 200, 'Upload successful', req.file));
    }
    ,
    uploadMultipleImages: async (req: Request, res: Response) => {
        if (!req.files) {
            throw new ApiError(400, 'Upload failed', "No files provided");
        }
        const files = req.files as Express.Multer.File[];
        res.status(200).json(new ApiResponse(true, 200, 'Upload successful', files));
    }
}
export default imageController