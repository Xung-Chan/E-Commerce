import { commentDao } from "../daos/Comment.dao.js";
import { userDao } from "../daos/User.dao.js";
import { CreateCommentRequest } from "../dto/Request.dto.js";
import { ioServer } from "../index.js";
const commentService = {

    createComment: async (data: CreateCommentRequest) => {
        let comment;
        if (data.userId) {
            const user = await userDao.readById(data.userId);
            if (!user) {
                throw new Error("User not found");
            }
            comment = await commentDao.create({
                userId: data.userId,
                productId: data.productId,
                content: data.content,
                fullName: user.fullName
            });

        }
        else {
            comment = await commentDao.create({
                productId: data.productId,
                content: data.content,
                fullName: "Anonymous"
            });
        }
        ioServer.to(`product_${data.productId}`).emit("newComment", comment);

        if (!comment) {
            throw new Error("Failed to create comment");
        }
        return comment;
    },

    getAllComments: async () => {
        return commentDao.list();
    },

    getCommentById: async (id: string) => {
        return commentDao.readById(id);
    },

    getCommentsByProductId: async (productId: string) => {
        return commentDao.findBy({ productId: productId });
    },

    deleteCommentById: async (id: string) => {
        return commentDao.deleteById(id);
    }
};


export default commentService;