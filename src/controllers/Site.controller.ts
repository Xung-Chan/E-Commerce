import { Request, Response } from "express";
import { Pagination, ProductQuery } from "../utils/Pagination.js";
import { getCommonViewData, renderWithCommon } from "../utils/ViewData.js";
import { apiUrl, createApi, unwrap } from "../utils/ApiClient.js";

const siteController = {
    // --- LOGIN ---
    // Login Page
    login: async (req: Request, res: Response) => {
        const commonData = await getCommonViewData(req);
        if (commonData.isLoggedIn) {
            return res.redirect('/');
        }
        return res.render("login", {
            title: "Đăng nhập | CoreStation",
            ...commonData
        });
    },
    // Login Form
    loginPost: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const errors = [];
            if (!email?.trim()) errors.push({ field: "email", message: "Email/Số điện thoại không được để trống" });
            if (!password?.trim()) errors.push({ field: "password", message: "Mật khẩu không được để trống" });
            if (errors.length) {
                return renderWithCommon(req, res, "login", {
                    title: "Đăng nhập | CoreStation",
                    errors: errors,
                    formData: { email },
                    errorMessage: "Vui lòng kiểm tra lại thông tin đăng nhập",
                });
            }

            const api = createApi();
            const resp = await api.post("/api/auth/login", { email: email.trim(), password: password.trim() });
            const data = unwrap<{ accessToken?: string; token?: string }>(resp);
            const token = (data as any)?.accessToken || (data as any)?.token;
            if (token) res.cookie("token", token, { httpOnly: true });

            return res.redirect("/");
        } catch (error: any) {
            const status = error?.response?.status;
            const apiErr = error?.response?.data;
            const payload = {
                title: "Đăng nhập | CoreStation",
                formData: { email: req.body?.email },
                errorMessage: apiErr.message
                // (status === 401 && "Email/số điện thoại hoặc mật khẩu không đúng") ||
                // apiErr?.message ||
                // "Không thể kết nối đến server. Vui lòng thử lại sau.",
            };
            return renderWithCommon(req, res, "login", payload);
        }
    },

    // --- REGISTER ---
    // Register page
    register: async (req: Request, res: Response) => {
        const commonData = await getCommonViewData(req);
        return res.render("register", {
            title: "Đăng ký | CoreStation",
            ...commonData
        });
    },
    // Register form
    registerPost: async (req: Request, res: Response) => {
        try {
            const { email, fullName, password, address } = req.body;

            const errors = [];
            if (!email?.trim()) errors.push({ field: "email", message: "Email không được để trống" });
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push({ field: "email", message: "Email không hợp lệ" });
            if (!fullName?.trim()) errors.push({ field: "fullName", message: "Họ tên không được để trống" });
            if (!password?.trim()) errors.push({ field: "password", message: "Mật khẩu không được để trống" });
            else if (password.length < 6) errors.push({ field: "password", message: "Mật khẩu phải có ít nhất 6 ký tự" });
            if (!address?.trim()) errors.push({ field: "address", message: "Địa chỉ không được để trống" });
            if (errors.length) {
                return renderWithCommon(req, res, "register", {
                    title: "Đăng ký | CoreStation",
                    errors: errors,
                    formData: { email, fullName, address },
                    errorMessage: "Vui lòng kiểm tra lại thông tin đã nhập",
                });
            }

            const api = createApi();
            await api.post("/api/auth/register", {
                email: email.trim(),
                fullName: fullName.trim(),
                password: password.trim(),
                address: address.trim()
            });

            return renderWithCommon(req, res, "register", {
                title: "Đăng ký | CoreStation",
                successMessage: "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.",
                showLoginLink: true
            });
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
        try {
            const { email = '' } = req.body as { email?: string };
            const value = email.trim();
            let errorMessage = '';
            if (!value) errorMessage = 'Vui lòng nhập email của bạn';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMessage = 'Email không hợp lệ';

            if (errorMessage) {
                return renderWithCommon(req, res, 'forgot-password', {
                    title: 'Quên mật khẩu | CoreStation',
                    errorMessage,
                    formData: { email: value }
                });
            }

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
        if (!next) errors.push({ field: 'newPassword', message: 'Mật khẩu mới không được để trống' });
        else if (next.length < 6) errors.push({ field: 'newPassword', message: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
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
        return res.redirect("/login");
    },

    // --- PROFILE ---
    // Profile page
    profile: async (req: Request, res: Response) => {
        const common = await getCommonViewData(req);
        if (!common.isLoggedIn) return res.redirect("/login");
        return res.render("profile", { title: "Thông tin cá nhân | CoreStation", ...common });
    },

    // Thêm địa chỉ
    profileAddAddress: async (req: Request, res: Response) => {
        const { newAddress } = req.body;

        if (!newAddress?.trim()) {
            return renderWithCommon(req, res, "profile", { title: "Thông tin cá nhân | CoreStation", errorMessage: "Địa chỉ không được để trống." });
        }

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

    // Xóa địa chỉ
    profileDeleteAddress: async (req: Request, res: Response) => {
        const { addressId } = req.params;

        if (!addressId) {
            return renderWithCommon(req, res, "profile", { title: "Thông tin cá nhân | CoreStation", errorMessage: "Địa chỉ không hợp lệ." });
        }

        try {
            const api = createApi(req);
            await api.delete(`/api/users/addresses/me/${addressId}`);
            return res.redirect("/profile");
        } catch (e: any) {
            return renderWithCommon(req, res, "profile", {
                title: "Thông tin cá nhân | CoreStation",
                errorMessage: e?.response?.data?.message || "Có lỗi xảy ra khi xóa địa chỉ.",
            });
        }
    },

    // Cập nhật địa chỉ
    profileUpdateAddress: async (req: Request, res: Response) => {
        const { addressId } = req.params;
        const { newAddress } = req.body;

        if (!addressId || !newAddress?.trim()) {
            return renderWithCommon(req, res, "profile", { title: "Thông tin cá nhân | CoreStation", errorMessage: "Địa chỉ mới không được để trống." });
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

    // Cập nhật thông tin người dùng
    profileUpdateUser: async (req: Request, res: Response) => {
        const { email = "", fullName = "" } = req.body as { email?: string; fullName?: string };
        const trimmed = { email: email.trim(), fullName: fullName.trim() };

        const errors = [];
        if (!trimmed.email) errors.push({ field: "email", message: "Email không được để trống" });
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) errors.push({ field: "email", message: "Email không hợp lệ" });
        if (!trimmed.fullName) errors.push({ field: "fullName", message: "Họ tên không được để trống" });

        if (errors.length) {
            return renderWithCommon(req, res, "profile", {
                title: "Thông tin cá nhân | CoreStation",
                errors,
                errorMessage: "Vui lòng kiểm tra lại thông tin",
            });
        }

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

    // Cập nhật mật khẩu
    profileChangePassword: async (req: Request, res: Response) => {
        const { oldPassword = "", newPassword = "", confirmPassword = "" } = req.body as any;
        const curr = oldPassword.trim();
        const next = newPassword.trim();
        const confirm = confirmPassword.trim();

        const errors = [];
        if (!curr) errors.push({ field: "oldPassword", message: "Vui lòng nhập mật khẩu hiện tại" });
        if (!next) errors.push({ field: "newPassword", message: "Mật khẩu mới không được để trống" });
        else if (next.length < 6) errors.push({ field: "newPassword", message: "Mật khẩu mới phải có ít nhất 6 ký tự" });
        if (next !== confirm) errors.push({ field: "confirmPassword", message: "Xác nhận mật khẩu không khớp" });
        if (errors.length) {
            return renderWithCommon(req, res, "profile", {
                title: "Thông tin cá nhân | CoreStation",
                errors,
                errorMessage: "Vui lòng kiểm tra lại thông tin",
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

    // --- Home ---
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
            categoryProducts: processed,
            cartItemCount: 3 // Update later with actual cart item count
        });
    },

    // --- CATALOG ---
    catalog: async (req: Request, res: Response) => {
        const query: ProductQuery = req.query as ProductQuery;
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 9;
        const {
            sortBy = '',
            sortOrder = 'desc',
            categoryId = '',
            brandId = '',
            minPrice = '',
            maxPrice = '',
            name = ''
        } = query;

        const apiParams: any = { page, limit };
        if (sortBy) apiParams.sortBy = sortBy;
        if (sortOrder) apiParams.sortOrder = sortOrder;
        if (categoryId) apiParams.categoryId = categoryId;
        if (brandId) apiParams.brandId = brandId;
        if (minPrice) apiParams.minPrice = minPrice;
        if (maxPrice) apiParams.maxPrice = maxPrice;
        if (name) apiParams.name = name;

        const api = createApi(req);

        const productsRes = await api.get(`${apiUrl}/api/products/search`, { params: apiParams });
        const paginationData = productsRes.data?.data || productsRes.data;
        const products_catalog = Array.isArray(paginationData?.datas) ? paginationData.datas : [];
        const pagination = new Pagination(
            products_catalog,
            page,
            limit,
            paginationData?.totalDatas || products_catalog.length
        );

        const brandsRes = await api.get(`${apiUrl}/api/brands`);
        const brands = Array.isArray(brandsRes.data) ? brandsRes.data : brandsRes.data.data;

        const filteredQuery: Record<string, string> = {};
        Object.entries({ sortBy, sortOrder, categoryId, brandId, minPrice, maxPrice, name }).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== '') {
                filteredQuery[k] = String(v);
            }
        });
        const baseQueryString = Object.entries(filteredQuery)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
            .join('&');

        const commonData = await getCommonViewData(req);
        return res.render('catalog', {
            title: 'Danh mục sản phẩm | CoreStation',
            brands,
            products_catalog: pagination.datas,
            query: filteredQuery,
            baseQueryString,
            pages: Array.from({ length: pagination.totalPages }, (_, i) => ({
                number: i + 1,
                active: i + 1 === pagination.page
            })),
            isFirstPage: !pagination.hasPrevPage,
            isLastPage: !pagination.hasNextPage,
            prevPage: pagination.prevPage,
            nextPage: pagination.nextPage,
            ...commonData
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

            const categoryRes = await api.get(`${apiUrl}/api/categories/${product.categoryId}`);
            const category = unwrap(categoryRes);

            const brandRes = await api.get(`${apiUrl}/api/brands/${product.brandId}`);
            const brand = unwrap(brandRes);

            const selectedVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;

            // TODO: TEMP STARS
            const stars = [1, 2, 3, 4, 5];

            return res.render('product', {
                title: `${product.name} | CoreStation`,
                product,
                category,
                brand,
                selectedVariant,
                stars,
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

    // --- CART ---
    // Cart page
    cart: async (req: Request, res: Response) => {
        const commonData = await getCommonViewData(req);

        const sampleData = {
            items: [
                {
                    cartItemId: '64b8f0a5c9e77a6f4d2e8b1a',
                    imageUrl: 'https://placehold.co/56x56?text=?',
                    product: 'Product 1',
                    variant: 'Variant 1',
                    quantity: 2
                },
                {
                    cartItemId: '64b8f0e2c9e77a6f4d2e8b1b',
                    variantId: '64b8efdbc9e77a6f4d2e8b19',
                    productId: '64b8ee9bc9e77a6f4d2e8b15',
                    product: 'Product 2',
                    variant: 'Variant 2',
                    quantity: 1
                }
            ],
            tax: 50000,
            shippingCost: 20000,
            totalPrice: 320000
        }

        return res.render('cart', {
            title: 'Giỏ hàng | CoreStation',
            cart: sampleData,
            ...commonData
        });
    }


};

export default siteController;