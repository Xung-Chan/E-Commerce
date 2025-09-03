import express, { Request, Response } from "express";
import User from "../models/User.model";
const userRouter = express.Router();
// getall
userRouter.get("/", async (req, res) => {
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
// create
userRouter.post("/", async (req: Request, res: Response) => {
    const { fullName, email, addresses, cart, password } = req.body;
    const user = new User({
        fullName,
        email,
        addresses,
        cart,
        password
    });
    await user.save();
    res.status(201).json({ message: "User added successfully" });
})

// update
userRouter.put("/:userId", async (req: Request, res: Response) => {
    const { fullName, email, addresses, cart, password } = req.body;
    const user = await User.findByIdAndUpdate(req.params.userId, {
        fullName,
        email,
        addresses,
        cart,
        password
    }, { new: true });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
})

//delete
userRouter.delete("/:userId", async (req: Request, res: Response) => {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
})

export default userRouter;