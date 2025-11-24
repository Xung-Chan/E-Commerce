import expressAsyncHandler from "express-async-handler";
import e, { Request, Response } from "express";
import { CreateCommentDto } from "../dto/Create.dto.js";
import commentService from "../services/Comment.service.js";
import ApiResponse from "../utils/Api.response.js";
import ApiError from "../utils/ApiError.js";
import { CreateCommentRequest } from "../dto/Request.dto.js";
const commentController = {

    createComment: expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).userId;
        const {
            productId,
            content
        } = req.body;
        let data;
        if (userId) {

            data = {
                userId: userId,
                productId: productId,
                content: content
            };
        }
        else {
            data = {
                productId: productId,
                content: content
            };
        }
        const comment = await commentService.createComment(data);
        res.status(201).json(new ApiResponse(true, 201, "Comment created successfully", comment));
    }),

    getAllComments: expressAsyncHandler(async (req: Request, res: Response) => {
        const comments = await commentService.getAllComments();
        res.status(200).json(new ApiResponse(true, 200, "Comments fetched successfully", comments));
    }),

    getCommentsByProductId: expressAsyncHandler(async (req: Request, res: Response) => {
        const productId = req.params.productId;
        if (!productId) {
            res.status(400).json(new ApiResponse(false, 400, "Product ID is required", null));
            return;
        }
        const comments = await commentService.getCommentsByProductId(productId);
        res.status(200).json(new ApiResponse(true, 200, "Comments fetched successfully", comments));
    }),

    deleteCommentById: expressAsyncHandler(async (req: Request, res: Response) => {
        const commentId = req.params.commentId;
        if (!commentId) {
            res.status(400).json(new ApiResponse(false, 400, "Comment ID is required", null));
            return;
        }

        const deleted = await commentService.deleteCommentById(commentId);
        if (!deleted) {
            res.status(404).json(new ApiResponse(false, 404, "Comment not found", null));
            return;
        }

        res.status(200).json(new ApiResponse(true, 200, "Comment deleted successfully", null));
    })

};
export default commentController;