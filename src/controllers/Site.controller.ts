import { Request, Response } from "express";
import { Pagination, ProductQuery } from "../utils/Pagination.js";
import { getCommonViewData, renderWithCommon } from "../utils/ViewData.js";
import { apiUrl, createApi, unwrap } from "../utils/ApiClient.js";
import { LoginResponseDto } from "../dto/Response.dto.js";

const siteController = {
    // --- LOGIN ---
    // Login Page
    login: async (req: Request, res: Response) => {
        const commonData = await getCommonViewData(req);
        if (commonData.isLoggedIn) {
            return res.redirect('/');
        }

        const { registered } = req.query;
        const payload: any = {
            title: "Đăng nhập | CoreStation"
        };

        if (registered === 'success') {
            payload.successMessage = "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.";
        }

        renderWithCommon(req, res, "login", payload);
    },

    // Login Form
    loginPost: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const api = createApi();
            const resp = await api.post("/api/auth/login", { email: email.trim(), password: password.trim() });

            const data = unwrap<LoginResponseDto>(resp);
            const token = (data as any)?.accessToken || (data as any)?.token;

            if (token) res.cookie("token", token, { httpOnly: true });
            if (data.role === 'user') {
                return res.redirect("/");
            } else if (data.role === 'admin') {
                return res.redirect("/admin/dashboard");
            }
        } catch (error: any) {
            const apiErr = error?.response?.data;
            const payload = {
                title: "Đăng nhập | CoreStation",
                formData: { email: req.body?.email },
                errorMessage: apiErr.message
            };
            return renderWithCommon(req, res, "login", payload);
        }
    },



    // --- REGISTER ---
    // Register page
    register: async (req: Request, res: Response) => {
        return renderWithCommon(req, res, "register", {
            title: "Đăng ký | CoreStation"
        });
    },

    // Register form
    registerPost: async (req: Request, res: Response) => {
        const { email, fullName, address } = req.body;

        try {
            const api = createApi();
            await api.post("/api/auth/register", {
                email: email.trim(),
                fullName: fullName.trim(),
                address: address.trim()
            });

            return res.redirect("/login?registered=success");
        } catch (error: any) {
            const apiErr = error?.response?.data;
            const payload = {
                title: "Đăng ký | CoreStation",
                formData: { email: req.body?.email, fullName: req.body?.fullName, address: req.body?.address },
                errorMessage: apiErr?.message || "Có lỗi xảy ra khi đăng ký",
            };
            if (apiErr?.errors && Array.isArray(apiErr.errors)) {
                (payload as any).errors = apiErr.errors;
            }

            return renderWithCommon(req, res, "register", payload);
        }
    },



    // --- FORGOT PASSWORD ---
    // Forgot Password Page
    forgotPassword: async (req: Request, res: Response) => {
        return renderWithCommon(req, res, 'forgot-password', {
            title: 'Quên mật khẩu | CoreStation'
        });
    },
 
    // Forgot Password Form
    forgotPasswordPost: async (req: Request, res: Response) => {
        const { email } = req.body as { email: string };
        const value = email.trim();

        try {
            const api = createApi();
            await api.post('/api/auth/forgot-password', { email: value });

            return renderWithCommon(req, res, 'forgot-password', {
                title: 'Quên mật khẩu | CoreStation',
                successMessage: 'Nếu email tồn tại trong hệ thống, chúng tôi đã gửi liên kết đặt lại mật khẩu cho bạn.'
            });
        } catch (e) {
            const apiErr = (e as any)?.response?.data;
            return renderWithCommon(req, res, 'forgot-password', {
                title: 'Quên mật khẩu | CoreStation',
                errorMessage: apiErr?.message || 'Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.',
                formData: { email: req.body?.email }
            });
        }
    },



    // --- RESET PASSWORD ---
    // Reset Password Page
    resetPassword: async (req: Request, res: Response) => {
        const { token = '' } = req.query as { token?: string };

        return renderWithCommon(req, res, 'reset-password', {
            title: 'Đặt lại mật khẩu | CoreStation',
            token
        });
    },

    // Reset Password Form
    resetPasswordPost: async (req: Request, res: Response) => {
        const { token = '', newPassword = '', confirmPassword = '' } = req.body as any;
        const t = String(token || '').trim();
        const next = String(newPassword || '').trim();
        const confirm = String(confirmPassword || '').trim();

        const errors: { field?: string; message: string }[] = [];
        if (!t) errors.push({ message: 'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.' });
        if (next.length < 6) errors.push({ field: 'newPassword', message: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
        if (next !== confirm) errors.push({ field: 'confirmPassword', message: 'Xác nhận mật khẩu không khớp' });

        if (errors.length) {
            return renderWithCommon(req, res, 'reset-password', {
                title: 'Đặt lại mật khẩu | CoreStation',
                errors,
                errorMessage: errors[0]?.message || 'Vui lòng kiểm tra lại thông tin',
                token: t
            });
        }

        try {
            const api = createApi();
            await api.post('/api/auth/reset-password', { token: t, newPassword: next });

            return renderWithCommon(req, res, 'reset-password', {
                title: 'Đặt lại mật khẩu | CoreStation',
                successMessage: 'Mật khẩu đã được đặt lại. Bạn có thể đăng nhập bằng mật khẩu mới.'
            });
        } catch (e) {
            const apiErr = (e as any)?.response?.data;

            return renderWithCommon(req, res, 'reset-password', {
                title: 'Đặt lại mật khẩu | CoreStation',
                errorMessage: apiErr?.message || 'Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại sau.',
                token: t
            });
        }
    },



    // --- LOGOUT ---
    logout: async (req: Request, res: Response) => {
        res.clearCookie("token");
        return res.redirect("/");
    },



    // --- PROFILE ---
    // Profile page
    profile: async (req: Request, res: Response) => {
        const common = await getCommonViewData(req);
        if (!common.isLoggedIn) return res.redirect("/");

        return renderWithCommon(req, res, "profile", {
            title: "Thông tin cá nhân | CoreStation"
        });
    },

    // Add address
    profileAddAddress: async (req: Request, res: Response) => {
        const { newAddress } = req.body;

        try {
            const api = createApi(req);
            await api.post("/api/users/addresses/me", { address: newAddress.trim() });
            return res.redirect("/profile");
        } catch (e: any) {
            return renderWithCommon(req, res, "profile", {
                title: "Thông tin cá nhân | CoreStation",
                errorMessage: e?.response?.data?.message || "Có lỗi xảy ra khi thêm địa chỉ.",
            });
        }
    },

    // Delete address
    profileDeleteAddress: async (req: Request, res: Response) => {
        const { addressId } = req.params;

        if (!addressId) {
            return renderWithCommon(req, res, "profile", {
                title: "Thông tin cá nhân | CoreStation",
                errorMessage: "Địa chỉ không hợp lệ."
            });
        }

        try {
            const api = createApi(req);

            const addresses = await api.get("/api/users/addresses/me");
            if (addresses.data?.data?.length <= 1) {
                return renderWithCommon(req, res, "profile", {
                    title: "Thông tin cá nhân | CoreStation",
                    errorMessage: "Phải có ít nhất một địa chỉ trong danh sách.",
                });
            }

            await api.delete(`/api/users/addresses/me/${addressId}`);
            return res.redirect("/profile");
        } catch (e: any) {
            return renderWithCommon(req, res, "profile", {
                title: "Thông tin cá nhân | CoreStation",
                errorMessage: e?.response?.data?.message || "Có lỗi xảy ra khi xóa địa chỉ.",
            });
        }
    },

    // Update address
    profileUpdateAddress: async (req: Request, res: Response) => {
        const { addressId } = req.params;
        const { newAddress } = req.body;

        if (!addressId || !newAddress?.trim()) {
            return renderWithCommon(req, res, "profile", {
                title: "Thông tin cá nhân | CoreStation",
                errorMessage: "Địa chỉ mới không được để trống."
            });
        }

        try {
            const api = createApi(req);
            await api.patch(`/api/users/addresses/me/${addressId}`, { address: newAddress.trim() });
            return res.redirect("/profile");
        } catch (e: any) {
            return renderWithCommon(req, res, "profile", {
                title: "Thông tin cá nhân | CoreStation",
                errorMessage: e?.response?.data?.message || "Có lỗi xảy ra khi cập nhật địa chỉ.",
            });
        }
    },

    // Update user information
    profileUpdateUser: async (req: Request, res: Response) => {
        const { email = "", fullName = "" } = req.body as { email?: string; fullName?: string };
        const trimmed = { email: email.trim(), fullName: fullName.trim() };

        try {
            const userId = (req as any).userId;
            const api = createApi(req);
            await api.patch(`/api/users/${userId}`, trimmed);
            return renderWithCommon(req, res, "profile", {
                title: "Thông tin cá nhân | CoreStation",
                successMessage: "Đã cập nhật email và họ tên",
            });
        } catch (e: any) {
            return renderWithCommon(req, res, "profile", {
                title: "Thông tin cá nhân | CoreStation",
                errorMessage: e?.response?.data?.message || "Có lỗi xảy ra khi cập nhật.",
            });
        }
    },

    // Update password
    profileChangePassword: async (req: Request, res: Response) => {
        const { oldPassword = "", newPassword = "", confirmPassword = "" } = req.body as any;
        const curr = oldPassword.trim();
        const next = newPassword.trim();
        const confirm = confirmPassword.trim();

        const errors = [];
        if (next.length < 6) errors.push({ field: "newPassword", message: "Mật khẩu mới phải có ít nhất 6 ký tự" });
        if (next !== confirm) errors.push({ field: "confirmPassword", message: "Xác nhận mật khẩu không khớp" });
        if (errors.length) {
            return renderWithCommon(req, res, "profile", {
                title: "Thông tin cá nhân | CoreStation",
                errorMessage: errors[0]?.message || "Vui lòng kiểm tra lại thông tin",
            });
        }

        try {
            const api = createApi(req);
            await api.post("/api/auth/change-password", { oldPassword: curr, newPassword: next });
            return renderWithCommon(req, res, "profile", {
                title: "Thông tin cá nhân | CoreStation",
                successMessage: "Đã đổi mật khẩu thành công",
            });
        } catch (e: any) {
            return renderWithCommon(req, res, "profile", {
                title: "Thông tin cá nhân | CoreStation",
                errorMessage: e?.response?.data?.message || "Có lỗi xảy ra khi đổi mật khẩu.",
            });
        }
    },

    // --- LANDING PAGE ---
    home: async (req: Request, res: Response) => {
        const api = createApi(req);
        const landing = unwrap(await api.get("/api/products/landing"));

        const bestSellers = landing?.bestSellers || [];
        const newArrivals = landing?.newArrivals || [];
        const categoryProducts = landing?.categoryProducts || [];

        // Window new products
        const windowNewProducts: any[][] = [];
        for (let i = 0; i < newArrivals.length; i += 4) {
            let w = newArrivals.slice(i, i + 4);
            if (w.length < 4) w = w.concat(newArrivals.slice(0, 4 - w.length));
            windowNewProducts.push(w);
        }

        // Category windows
        const otherSize = 6;
        const processed = categoryProducts.map((c: any) => {
            const windows: any[][] = [];
            for (let i = 0; i < (c.products?.length || 0); i += otherSize) {
                let w = c.products.slice(i, i + otherSize);
                if (w.length < otherSize && c.products.length >= otherSize) {
                    w = w.concat(c.products.slice(0, otherSize - w.length));
                }
                windows.push(w);
            }
            return { name: c.name, categoryId: c.categoryId, windowProducts: windows };
        });

        return renderWithCommon(req, res, "home", {
            title: "CoreStation - PC và linh kiện máy tính",
            bestSellersProducts: bestSellers,
            windowNewProducts,
            categoryProducts: processed
        });
    },


    
    // --- CATALOG ---
    catalog: async (req: Request, res: Response) => {
        // Query parameters
        const query: ProductQuery = req.query as ProductQuery;
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 9;
        const apiParams: any = { page, limit };
        const api = createApi(req);

        const {
            sortBy = '',
            sortOrder = 'desc',
            name = '',
            categoryId = '',
            minPrice = '',
            maxPrice = '',
            rating = ''
        } = query;

        if (sortBy) apiParams.sortBy = sortBy;
        if (sortOrder) apiParams.sortOrder = sortOrder;
        if (categoryId) apiParams.categoryId = categoryId;
        if (minPrice) apiParams.minPrice = minPrice;
        if (maxPrice) apiParams.maxPrice = maxPrice;
        if (name) apiParams.name = name;
        if (rating) apiParams.rating = rating;

        // Get Products
        const productsRes = await api.get(`${apiUrl}/api/products/search`, { params: apiParams });
        const paginationData = productsRes.data?.data || productsRes.data;
        console.log('Pagination data:', paginationData);
        const products = Array.isArray(paginationData?.datas) ? paginationData.datas : [];


        // Build base query string
        const filteredQuery: Record<string, string> = {};
        Object.entries({ sortBy, sortOrder, categoryId, minPrice, maxPrice, name, rating }).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== '') {
                filteredQuery[k] = String(v);
            }
        });
        const baseQueryString = Object.entries(filteredQuery)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
            .join('&');


        // Render
        return renderWithCommon(req, res, 'catalog', {
            title: 'Danh mục sản phẩm | CoreStation',
            products_catalog: products,
            query: filteredQuery,
            baseQueryString,
            pages: Array.from({ length: paginationData?.totalPages || 1 }, (_, i) => ({
                number: i + 1,
                active: i + 1 === (paginationData?.page || page)
            })),
            isFirstPage: !(paginationData?.hasPrevPage),
            isLastPage: !(paginationData?.hasNextPage),
            prevPage: paginationData?.prevPage || null,
            nextPage: paginationData?.nextPage || null
        });
    },



    // --- PRODUCT DETAIL ---
    product: async (req: Request, res: Response) => {
        const { productId } = req.params;
        const commonData = await getCommonViewData(req);

        const api = createApi(req);
        try {
            const productRes = await api.get(`${apiUrl}/api/products/${productId}`);
            const product = unwrap(productRes);
            const selectedVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
            const productRating = product.rate;

            const categoryRes = await api.get(`${apiUrl}/api/categories/${product.categoryId}`);
            const category = unwrap(categoryRes);

            const brandRes = await api.get(`${apiUrl}/api/brands/${product.brandId}`);
            const brand = unwrap(brandRes);

            // Load existing comments for product
            let comments: any[] = [];
            try {
                const commentsRes = await api.get(`${apiUrl}/api/comments/product/${productId}`);
                const rawComments = unwrap<any[]>(commentsRes) || [];
                comments = rawComments.map(c => ({
                    name: c.fullName || c.name || 'Người dùng',
                    content: c.content,
                    date: c.createdAt || c.date || '',
                }));
            } catch (e) {
                comments = [];
            }

            // Load user rating info (determine if current user has rated)
            const userId = (req as any).userId || null;
            let userRating: any = null;
            try {
                const ratesRes = await api.get(`${apiUrl}/api/ratings/product/${productId}`);
                const rates = unwrap<any[]>(ratesRes) || [];
                if (userId) {
                    userRating = rates.find(r => String(r.userId) === String(userId)) || null;
                }
            } catch (e) {
                userRating = null;
            }
            const showUserRatingForm = commonData.isLoggedIn && !userRating;

            return res.render('product', {
                title: `${product.name} | CoreStation`,
                product,
                category,
                brand,
                selectedVariant,
                productRating,
                stars: [1, 2, 3, 4, 5],
                comments,
                userRating,
                showUserRatingForm,
                ...commonData
            });
        } catch (error: any) {
            const status = error?.response?.status;
            const message = error?.response?.data?.message || "Không thể kết nối đến server. Vui lòng thử lại sau.";
            if (status === 404) {
                return res.status(404).render('404', { title: 'Không tìm thấy | CoreStation', errorMessage: message });
            }
            return res.render('productDetail', { title: 'Chi tiết sản phẩm | CoreStation', errorMessage: message });
        }
    },


    // Add to cart from product page
    productAddToCart: async (req: Request, res: Response) => {
        const { variantId, quantity } = req.body;
        const qty = Number(quantity) || 1;

        try {
            const api = createApi(req);
            await api.post(`${apiUrl}/api/users/cart/me`, {
                variantId,
                quantity: qty
            });
            return res.redirect('/cart');
        } catch (error: any) {
            const status = error?.response?.status;
            const message = error?.response?.data?.message || "Không thể kết nối đến server. Vui lòng thử lại sau.";
            if (status === 404) {
                return res.status(404).render('404', { title: 'Không tìm thấy | CoreStation', errorMessage: message });
            }
            return res.render('productDetail', { title: 'Chi tiết sản phẩm | CoreStation', errorMessage: message });
        }
    },



    // --- CART ---
    // Cart page
    cart: async (req: Request, res: Response) => {
        const commonData = await getCommonViewData(req);

        if (commonData.isLoggedIn) {
            const api = createApi(req)
            const cartRes = await api.get(`${apiUrl}/api/users/cart/me`);
            const cart = unwrap(cartRes);

            return res.render('cart', {
                title: 'Giỏ hàng | CoreStation',
                cart,
                ...commonData
            });
        } else {
            res.redirect('/login');
        }
    },



    
    // --- CHECKOUT ---
    checkout: async (req: Request, res: Response) => {
        renderWithCommon(req, res, 'checkout', {
            title: 'Thanh toán | CoreStation'
        });
    },

    // Order result page
    orderResult: async (req: Request, res: Response) => {
        const { orderId } = req.params as { orderId?: string };
        
        if (!orderId) {
            return res.redirect('/');
        }

        try {
            const api = createApi(req);
            const orderRes = await api.get(`${apiUrl}/api/orders/${orderId}`);
            const order = unwrap(orderRes);

            return renderWithCommon(req, res, 'order_result', {
                title: 'Đơn hàng thành công | CoreStation',
                orderId,
                order
            });
        } catch (error: any) {
            return renderWithCommon(req, res, 'order_result', {
                title: 'Đơn hàng thành công | CoreStation',
                orderId,
                errorMessage: error?.response?.data?.message || 'Không thể tải thông tin đơn hàng'
            });
        }
    },


    // --- ORDER HISTORY ---
    orderHistory: async (req: Request, res: Response) => {
        renderWithCommon(req, res, 'order_history', {
            title: 'Lịch sử đơn hàng | CoreStation'
        });
    }
};

export default siteController;