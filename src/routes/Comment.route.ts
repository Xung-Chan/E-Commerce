import { Router } from "express";
import commentController from "../controllers/Comment.controller.js";
import { authAnonymous, authJwt, authJwtAdmin } from "../middleware/authJwt.middleware.js";

const commentRouter = Router();

commentRouter.get("/product/:productId", commentController.getCommentsByProductId);
commentRouter.post("/", authAnonymous, commentController.createComment);
commentRouter.delete("/:id", authJwtAdmin, commentController.deleteCommentById);
commentRouter.get("/", commentController.getAllComments);

export default commentRouter;