//Front-end
import axios from "axios";

import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Pagination, QueryUrl } from "../utils/Pagination.js";

// Use localhost for internal API calls
const apiUrl = 'http://localhost:8000';

const siteController = {
    login: (req: Request, res: Response) => {
        console.log((req as any).isLoggedIn)
        if ((req as any).isLoggedIn) {
            return res.redirect('/');
        }
        res.render('login', {
            title: 'Đăng nhập | CoreStation'
        });
    },

    register: (req: Request, res: Response) => {
        res.render('register', {
            title: 'Đăng ký | CoreStation'
        });
    },

    registerPost: async (req: Request, res: Response) => {
        try {
            const { email, fullName, password, address } = req.body;
            const errors: { field: string; message: string }[] = [];

            // Server-side validation
            if (!email || !email.trim()) {
                errors.push({ field: 'email', message: 'Email không được để trống' });
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errors.push({ field: 'email', message: 'Email không hợp lệ' });
            }
            if (!fullName || !fullName.trim()) {
                errors.push({ field: 'fullName', message: 'Họ tên không được để trống' });
            }
            if (!password || !password.trim()) {
                errors.push({ field: 'password', message: 'Mật khẩu không được để trống' });
            } else if (password.length < 6) {
                errors.push({ field: 'password', message: 'Mật khẩu phải có ít nhất 6 ký tự' });
            }
            if (!address || !address.trim()) {
                errors.push({ field: 'address', message: 'Địa chỉ không được để trống' });
            }
            if (errors.length > 0) {
                return res.render('register', {
                    title: 'Đăng ký | CoreStation',
                    errors: errors,
                    formData: { email, fullName, address },
                    errorMessage: 'Vui lòng kiểm tra lại thông tin đã nhập'
                });
            }

            const response = await axios.post(`${apiUrl}/api/auth/register`, {
                email: email.trim(),
                fullName: fullName.trim(),
                password: password.trim(),
                address: address.trim()
            });

            // Đăng ký thành công
            res.render('register', {
                title: 'Đăng ký | CoreStation',
                successMessage: 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.',
                showLoginLink: true
            });

        } catch (error: any) {
            console.error('Register error:', error);

            // Xử lý lỗi từ API
            if (error.response?.data) {
                const apiError = error.response.data;
                
                // Nếu có lỗi validation từ API
                if (apiError.errors && Array.isArray(apiError.errors)) {
                    return res.render('register', {
                        title: 'Đăng ký | CoreStation',
                        errors: apiError.errors,
                        formData: { email: req.body.email, fullName: req.body.fullName, address: req.body.address },
                        errorMessage: apiError.message || 'Có lỗi xảy ra khi đăng ký'
                    });
                }

                // Lỗi chung từ API
                return res.render('register', {
                    title: 'Đăng ký | CoreStation',
                    formData: { email: req.body.email, fullName: req.body.fullName, address: req.body.address },
                    errorMessage: apiError.message || 'Email đã được sử dụng hoặc có lỗi xảy ra'
                });
            }

            // Lỗi kết nối
            res.render('register', {
                title: 'Đăng ký | CoreStation',
                formData: { email: req.body.email, fullName: req.body.fullName, address: req.body.address },
                errorMessage: 'Không thể kết nối đến server. Vui lòng thử lại sau.'
            });
        }
    },

    home: async (req: Request, res: Response) => {
        // Get all categories
        const categoriesRes = await axios.get(`${apiUrl}/api/categories`);
        const categories = Array.isArray(categoriesRes.data) ? categoriesRes.data : categoriesRes.data.data;
        console.log(categories)

        // Get landing products
        const landingProductsRes = await axios.get(`${apiUrl}/api/products/landing`);
        const { bestSellers, newArrivals, categoryProducts } = Array.isArray(landingProductsRes.data) ? landingProductsRes.data : landingProductsRes.data.data;

        // New Products
        const newProductsWindowSize = 4;
        const windowNewProducts = [];
        for (let i = 0; i < newArrivals.length; i += newProductsWindowSize) {
            let window = newArrivals.slice(i, i + newProductsWindowSize);
            if (window.length < newProductsWindowSize) {
                window = window.concat(newArrivals.slice(0, newProductsWindowSize - window.length));
            }
            windowNewProducts.push(window);
        }

        // Other Products
        interface Product {
            _id: string;
            name: string;
            description: string;
            images: string[];
            variants: Array<{
                price: number;
                distinctFeature: string;
            }>;
        }
        interface ProcessedCategoryProduct {
            name: string;
            categoryId: string;
            windowProducts: Product[][];
        }

        const otherProductsWindowSize = 6;
        const processedCategoryProducts: ProcessedCategoryProduct[] = [];

        if (categoryProducts && categoryProducts.length > 0) {
            categoryProducts.forEach((category: any) => {
                const windowOtherProducts = [];
                if (category.products && category.products.length > 0) {
                    for (let i = 0; i < category.products.length; i += otherProductsWindowSize) {
                        let window = category.products.slice(i, i + otherProductsWindowSize);
                        if (window.length < otherProductsWindowSize && category.products.length >= otherProductsWindowSize) {
                            const remaining = otherProductsWindowSize - window.length;
                            window = window.concat(category.products.slice(0, remaining));
                        }
                        windowOtherProducts.push(window);
                    }
                }

                processedCategoryProducts.push({
                    name: category.name,
                    categoryId: category.categoryId,
                    windowProducts: windowOtherProducts
                });
            });
        }

        // Render
        res.render('home', {
            title: 'CoreStation - PC và linh kiện máy tính',
            categories: categories,
            bestSellersProducts: bestSellers || [],
            windowNewProducts: windowNewProducts || [],
            categoryProducts: processedCategoryProducts || [],
        });
    },

    catalog: async (req: Request, res: Response) => {
        // Type-safe query parameters using QueryUrl interface
        const query: QueryUrl = req.query as QueryUrl;

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 9;

        const {
            sortBy = '',
            sortOrder = 'desc',
            categoryId = '',
            brandId = '',
            minPrice = '',
            maxPrice = ''
        } = query;

        const apiParams: any = { page, limit };
        if (sortBy) apiParams.sortBy = sortBy;
        if (sortOrder) apiParams.sortOrder = sortOrder;
        if (categoryId) apiParams.categoryId = categoryId;
        if (brandId) apiParams.brandId = brandId;
        if (minPrice) apiParams.minPrice = minPrice;
        if (maxPrice) apiParams.maxPrice = maxPrice;

        const productsRes = await axios.get(`${apiUrl}/api/products/search`, { params: apiParams });
        const paginationData = productsRes.data?.data || productsRes.data;
        const products_catalog = Array.isArray(paginationData?.datas) ? paginationData.datas : [];

        const pagination = new Pagination(
            products_catalog,
            page,
            limit,
            paginationData?.totalDatas || products_catalog.length
        );

        const categoriesRes = await axios.get(`${apiUrl}/api/categories`);
        const categories = Array.isArray(categoriesRes.data) ? categoriesRes.data : categoriesRes.data.data;
        const brandsRes = await axios.get(`${apiUrl}/api/brands`);
        const brands = Array.isArray(brandsRes.data) ? brandsRes.data : brandsRes.data.data;

        const filteredQuery: Record<string, string> = {};
        Object.entries({ sortBy, sortOrder, categoryId, brandId, minPrice, maxPrice }).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== '') {
                filteredQuery[k] = String(v);
            }
        });

        const baseQueryString = Object.entries(filteredQuery)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
            .join('&');

        res.render('catalog', {
            title: 'Danh mục sản phẩm | CoreStation',
            categories,
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
            nextPage: pagination.nextPage
        });
    },

    product: async (req: Request, res: Response) => {
        const productRes = await axios.get(`${apiUrl}/api/products/details/${req.params.productId}`);
        const product = productRes.data?.data || productRes.data;

        const categoryRes = await axios.get(`${apiUrl}/api/categories/${product.categoryId}`);
        const category = categoryRes.data?.data || categoryRes.data;

        const brandRes = await axios.get(`${apiUrl}/api/brands/${product.brandId}`);
        const brand = brandRes.data?.data || brandRes.data;

        // Chọn variant đầu tiên làm default nếu không có variant nào được chọn
        const selectedVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null;

        // Tạo mảng stars cho rating
        const stars = [1, 2, 3, 4, 5];

        res.render('product', {
            title: product.name || 'Chi tiết sản phẩm | CoreStation',
            product: product,
            category: category,
            brand: brand,
            selectedVariant: selectedVariant,
            stars: stars
        });
    }

}

export default siteController;