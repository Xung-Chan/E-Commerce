import { commentDao } from "../daos/Comment.dao.js";
import { userDao } from "../daos/User.dao.js";
import { CreateCommentRequest } from "../dto/Request.dto.js";
import { ioServer } from "../index.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CommentQuery, Pagination } from "../utils/Pagination.js";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";

const commentService = {

    createComment: async (data: CreateCommentRequest) => {
        let comment;

        const client = new GoogleGenerativeAI(GOOGLE_API_KEY);
        const model = client.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

        const prompt = `
            Câu bình luận sau đây mang cảm xúc như thế nào: 
            "${data.content}" 
            Hãy trả về dữ liệu dạng json như sau:
            { 
                "type":positive/neutral/negative,
                "summary":...
            }
            Hãy trả lời ngắn gọn trong khoảng 20 từ.
        `


        const response = await model.generateContent(
            prompt

        );
        const responseText = response.response.text().trim();
        console.log("Response from Gemini:", responseText);
        const cleanResponseText = responseText.replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        const parsedResponse: { type: "positive" | "neutral" | "negative", summary: string } = JSON.parse(cleanResponseText);

        let commentData = {
            productId: data.productId,
            content: data.content,
            summary: parsedResponse.summary,
            type: parsedResponse.type
        }


        if (data.userId) {
            const user = await userDao.readById(data.userId);
            if (!user) {
                throw new Error("User not found");
            }


            comment = await commentDao.create({
                userId: data.userId,
                fullName: user.fullName,
                ...commentData
            });

        }
        else {
            comment = await commentDao.create({
                fullName: "Anonymous",
                ...commentData
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

    getCommentsByProductId: async (query: CommentQuery) => {
        const filter: {
            productId: string;
            type?: "positive" | "neutral" | "negative";
        } = {
            productId: query.productId
        };
        const page = parseInt((query.page || "1"), 10);
        const limit = parseInt((query.limit || "10"), 10);
        const sortBy = query.sortBy || "createdAt";
        const sortOrder = query.sortOrder === "asc" ? 1 : -1;
        const options = {
            skip: (page - 1) * limit,
            limit: limit,
            sort: { [sortBy]: sortOrder },
        }
        if (query.type) {
            filter.type = query.type;
        }

        const comments = await commentDao.findBy(filter, options);
        const totalDatas = await commentDao.count(filter);
        return new Pagination(comments, page, limit, totalDatas);
    },
    deleteCommentById: async (id: string) => {
        return commentDao.deleteById(id);
    }
};


export default commentService;