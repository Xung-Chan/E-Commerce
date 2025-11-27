// src/routes/Admin.route.ts
import { Router, Request, Response } from "express";
import adminController from "../controllers/Admin.controller.js";
import { authJwtAdmin } from "../middleware/authJwt.middleware.js";

import { IProduct } from "../daos/Product.dao.js";

const router = Router();

//dashboard
router.get("/dashboard", authJwtAdmin, async (req: Request, res: Response) => {
    res.render("admin/dashboard", {
        title: "Dashboard",
        layout: "admin" 
    });
});

//users-management
router.get("/users", authJwtAdmin, async (req: Request, res: Response) => {
    const users = await adminController.getAllUsersHandler(req.query); 
    res.render("admin/users-management", { 
        title: "Users",
        users, 
        query: req.query, 
        layout: "admin" 
    });
});

router.get("/users/:id", authJwtAdmin, async (req: Request, res: Response) => {
    const userId = req.params.id!;
    
    try {
        const user = await adminController.getUserByIdHandler(userId);
        res.render("admin/user-detail", {
            title: `Chi Tiết Người Dùng: ${user.fullName}`,
            user, 
            layout: "admin"
        });
        
    } catch (error) {
        console.error("Lỗi khi xem chi tiết người dùng:", error);
        res.status(404).render("error/404", {
            title: "Không tìm thấy",
            layout: "admin"
        });
    }
});

router.delete("/api/users/:id", authJwtAdmin, async (req: Request, res: Response) => {
    const userId = req.params.id!;
    try {
        const success = await adminController.deleteUserHandler(userId); 
        if (success) {
            return res.status(200).json({ success: true, message: "Người dùng đã được xóa thành công." });
        } else {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng hoặc không thể xóa." });
        }
    } catch (error: any) {
        console.error("Lỗi khi xóa người dùng:", error);
        return res.status(error.statusCode || 500).json({ success: false, message: error.message || "Đã xảy ra lỗi server." });
    }
});

router.post("/api/users", authJwtAdmin, async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const newUser = await adminController.createUserHandler(userData); 
        
        return res.status(201).json({ 
            success: true, 
            message: "Người dùng được tạo thành công.", 
            user: newUser 
        });
    } catch (error: any) {
        console.error("Lỗi khi tạo người dùng:", error);
        return res.status(error.statusCode || 400).json({ 
            success: false, 
            message: error.message || "Lỗi tạo người dùng." 
        });
    }
});

router.patch("/api/users/:userId/status", authJwtAdmin, async (req: Request, res: Response) => {
    const { status } = req.body;
    const userId = req.params.userId;
    
    const success = await adminController.updateUserStatusHandler(userId!, status); 
    
    if (success) {
        return res.status(200).json({ success: true, message: `Trạng thái đã được cập nhật thành ${status}.` });
    } else {
        return res.status(404).json({ success: false, message: "Không tìm thấy người dùng." });
    }
});


router.get("/users/:id/edit", authJwtAdmin, async (req: Request, res: Response) => {
    const userId = req.params.id!;
    
    try {
        const user = await adminController.getUserByIdHandler(userId); 
        
        res.render("admin/user-edit", {
            title: `Chỉnh Sửa Người Dùng: ${user.fullName}`,
            user: user, 
            layout: "admin"
        });
        
    } catch (error) {
        console.error("Lỗi khi tải trang chỉnh sửa:", error);
        res.status(404).render("error/404", { 
            title: "Không tìm thấy",
            layout: "admin"
        });
    }
});

router.patch("/api/users/:userId", authJwtAdmin, async (req: Request, res: Response) => {
    const userId = req.params.userId!;
    const updateData = req.body;
    
    try {
        const success = await adminController.updateUserDetailHandler(userId, updateData);
        
        if (success) {
            return res.status(200).json({ success: true, message: "Thông tin người dùng đã được cập nhật." });
        } else {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng hoặc không có thay đổi." });
        }
    } catch (error: any) {
        console.error("Lỗi khi cập nhật chi tiết người dùng:", error);
        return res.status(error.statusCode || 500).json({ success: false, message: error.message || "Lỗi cập nhật server." });
    }
});

//coupons-management 
router.get("/coupons", authJwtAdmin, async (req: Request, res: Response) => {
    try {
        const paginationData = await adminController.getAllCouponsHandler(req.query); 
        
        res.render("admin/coupons-management", { 
            title: "Coupons",
            coupons: paginationData.datas, 
            pagination: paginationData, 
            query: req.query || {}, 
            layout: "admin" 
        });
    } catch (error) {
        console.error("Lỗi khi tải coupons:", error);
        res.status(500).render("error/500", { title: "Lỗi Server", layout: "admin" });
    }
});

router.post("/api/coupons", authJwtAdmin, async (req: Request, res: Response) => {
    try {
        const newCoupon = await adminController.createCouponHandler(req.body);
        return res.status(201).json({ success: true, message: "Mã giảm giá đã được tạo.", coupon: newCoupon });
    } catch (error: any) {
        console.error("Lỗi tạo coupon:", error);
        return res.status(error.statusCode || 400).json({ success: false, message: error.message || "Lỗi tạo coupon." });
    }
});

router.delete("/api/coupons/:id", authJwtAdmin, async (req: Request, res: Response) => {
    try {
        const success = await adminController.deleteCouponHandler(req.params.id!);
        if (success) {
            return res.status(200).json({ success: true, message: "Mã giảm giá đã được xóa." });
        } else {
            return res.status(404).json({ success: false, message: "Không tìm thấy mã giảm giá." });
        }
    } catch (error: any) {
        console.error("Lỗi xóa coupon:", error);
        return res.status(error.statusCode || 500).json({ success: false, message: error.message || "Lỗi xóa server." });
    }
});

router.patch("/api/coupons/:id/status", authJwtAdmin, async (req: Request, res: Response) => {
    const couponId = req.params.id!;
    const { status } = req.body;

    try {
        const success = await adminController.updateCouponStatusHandler(couponId, status); 
        if (success) {
            return res.status(200).json({ success: true, message: `Trạng thái coupon đã được cập nhật thành ${status}.` });
        } else {
            return res.status(404).json({ success: false, message: "Không tìm thấy mã giảm giá." });
        }
    } catch (error: any) {
        console.error("Lỗi cập nhật status coupon:", error);
        return res.status(error.statusCode || 500).json({ success: false, message: error.message || "Lỗi server." });
    }
});

router.patch("/api/coupons/:id", authJwtAdmin, async (req: Request, res: Response) => {
    const couponId = req.params.id!;
    const updateData = req.body;
    
    try {
        const success = await adminController.updateCouponDetailHandler(couponId, updateData); 
        
        if (success) {
            return res.status(200).json({ success: true, message: "Thông tin mã giảm giá đã được cập nhật." });
        } else {
            return res.status(400).json({ success: false, message: "Không tìm thấy mã giảm giá hoặc không có thay đổi." });
        }
    } catch (error: any) {
        console.error("Lỗi khi cập nhật coupon:", error);
        return res.status(error.statusCode || 400).json({ success: false, message: error.message || "Lỗi cập nhật server." });
    }
});




router.get("/products", authJwtAdmin, async (req: Request, res: Response) => {
    const products: IProduct[] = []; 
    
    res.render("admin/products-management", { 
        title: "Products",
        products, 
        layout: "admin" 
    });
});

export default router;
