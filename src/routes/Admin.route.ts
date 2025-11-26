// src/routes/Admin.route.ts
import { Router, Request, Response } from "express";
import adminController from "../controllers/Admin.controller.js";
import { authJwtAdmin } from "../middleware/authJwt.middleware.js";

const router = Router();

// Dashboard admin
router.get("/dashboard", authJwtAdmin, async (req: Request, res: Response) => {
    res.render("admin/dashboard", {
        title: "Dashboard",
        layout: "admin" // layout riêng cho admin
    });
});

// List all users
router.get("/users", authJwtAdmin, async (req: Request, res: Response) => {
    const users = await adminController.getAllUsersHandler();
    res.render("admin/users", {
        title: "Users",
        users,
        layout: "admin" // layout riêng cho admin
    });
});

// List user detail
router.get("/users/:userId", authJwtAdmin, async (req: Request, res: Response) => {
    const user = await adminController.getUserByIdHandler(req.params.userId!);
    res.render("admin/user-detail", {
        title: "User Detail",
        user,
        layout: "admin" // layout riêng cho admin
    });
});

// Update status (API JSON)
router.patch("/users/:userId/status", authJwtAdmin, async (req: Request, res: Response) => {
    const { status } = req.body;
    const success = await adminController.updateUserStatusHandler(req.params.userId!, status);
    res.json({ success });
});

export default router;
