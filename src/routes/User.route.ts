import express, { Request, Response } from "express";
import User from "../models/User.model";
import userController from "../controllers/User.controller";
const userRouter = express.Router();
// getall
userRouter.get("/", async (req: Request, res: Response) => {
    const users = await User.find({})
    res.status(200).json({ users })
})
//get single
userRouter.get("/:userId", async (req: Request, res: Response) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
})



export default userRouter;