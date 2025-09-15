import commentDao from "../daos/Comment.dao";
import { CreateCommentDto } from "../dto/Create.dto";
const commentService = {
    createComment: async (data: CreateCommentDto) => {
        return commentDao.create(data);
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