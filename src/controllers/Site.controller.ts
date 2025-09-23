//Front-end
import axios from "axios";

import { Request, Response } from "express";
import { comments, products } from "../sampleData.js";

const apiUrl = process.env.BASE_URL;

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

    home: async (req: Request, res: Response) => {
        const landingProductsRes = await axios.get(`${apiUrl}/api/products/landing`);
        const { bestSellers, newArrivals } = Array.isArray(landingProductsRes.data) ? landingProductsRes.data : landingProductsRes.data.data;

        const pcGamingProductsRes = await axios.get(`${apiUrl}/api/products/search?categoryId=68ca511408e9904136cc0b32&limit=20`);
        const pcGamingProducts = Array.isArray(pcGamingProductsRes.data) ? pcGamingProductsRes.data : pcGamingProductsRes.data.data;

        const workstationProductsRes = await axios.get(`${apiUrl}/api/products/search?categoryId=68ca511408e9904136cc0b34&limit=20`);
        const workstationProducts = Array.isArray(workstationProductsRes.data) ? workstationProductsRes.data : workstationProductsRes.data.data;

        const componentsProductsRes = await axios.get(`${apiUrl}/api/products/search?categoryId=68ca511408e9904136cc0b35&limit=20`);
        const componentsProducts = Array.isArray(componentsProductsRes.data) ? componentsProductsRes.data : componentsProductsRes.data.data;

        // Create windows
        const newProductsWindowSize = 4;
        const windowSize = 6;

        // New Products
        const windowNewProducts = [];
        for (let i = 0; i < newArrivals.length; i += newProductsWindowSize) {
            let window = newArrivals.slice(i, i + newProductsWindowSize);
            if (window.length < newProductsWindowSize) {
                window = window.concat(newArrivals.slice(0, newProductsWindowSize - window.length));
            }
            windowNewProducts.push(window);
        }
        // PC Gaming
        const windowPCGamingProducts = [];
        for (let i = 0; i < pcGamingProducts.length; i += windowSize) {
            let window = pcGamingProducts.slice(i, i + windowSize);
            if (window.length < windowSize) {
                window = window.concat(pcGamingProducts.slice(0, windowSize - window.length));
            }
            windowPCGamingProducts.push(window);
        }
        // Workstations
        const windowWorkstationProducts = [];
        for (let i = 0; i < workstationProducts.length; i += windowSize) {
            let window = workstationProducts.slice(i, i + windowSize);
            if (window.length < windowSize) {
                window = window.concat(workstationProducts.slice(0, windowSize - window.length));
            }
            windowWorkstationProducts.push(window);
        }
        // Components
        const windowComponentsProducts = [];
        for (let i = 0; i < componentsProducts.length; i += windowSize) {
            let window = componentsProducts.slice(i, i + windowSize);
            if (window.length < windowSize) {
                window = window.concat(componentsProducts.slice(0, windowSize - window.length));
            }
            windowComponentsProducts.push(window);
        }

        // Get all categories
        const categoriesRes = await axios.get(`${apiUrl}/api/categories`);
        const categories = Array.isArray(categoriesRes.data) ? categoriesRes.data : categoriesRes.data.data;

        // Render
        res.render('home', {
            title: 'CoreStation - PC và linh kiện máy tính',
            bestSellersProducts: bestSellers,
            windowNewProducts: windowNewProducts,
            windowPCGamingProducts: windowPCGamingProducts,
            windowWorkstationsProducts: windowWorkstationProducts,
            windowComponentsProducts: windowComponentsProducts,
            categories: categories
        });
    },

    catalog: async (req: Request, res: Response) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 9;

        const {
            sortBy = '',
            sortOrder = '',
            categoryId = '',
            brandId = '',
            minPrice = '',
            maxPrice = ''
        } = req.query as any;

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

        const totalPages = paginationData?.totalPages || 1;
        const currentPage = paginationData?.page || page;

        // categories & brands
        const categoriesRes = await axios.get(`${apiUrl}/api/categories`);
        const categories = Array.isArray(categoriesRes.data) ? categoriesRes.data : categoriesRes.data.data;
        const brandsRes = await axios.get(`${apiUrl}/api/brands`);
        const brands = Array.isArray(brandsRes.data) ? brandsRes.data : brandsRes.data.data;

        // Lọc query rỗng
        const rawQuery = { sortBy, sortOrder, categoryId, brandId, minPrice, maxPrice };
        const filteredQuery: Record<string, string> = {};
        Object.entries(rawQuery).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== '') filteredQuery[k] = String(v);
        });

        const baseQueryString = Object.entries(filteredQuery)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join('&'); // không có page ở đây

        res.render('catalog', {
            title: 'Danh mục sản phẩm | CoreStation',
            categories,
            brands,
            products_catalog,
            query: filteredQuery,
            baseQueryString,
            pages: Array.from({ length: totalPages }, (_, i) => ({
                number: i + 1,
                active: i + 1 === currentPage
            })),
            isFirstPage: currentPage === 1,
            isLastPage: currentPage === totalPages,
            prevPage: currentPage > 1 ? currentPage - 1 : 1,
            nextPage: currentPage < totalPages ? currentPage + 1 : totalPages
        });
    },

    productBySlug: (req: Request, res: Response) => {
        const { productSlug, variantSlug } = req.params;
        console.log("Product request:", productSlug, variantSlug);
        const product = products.find(p => p.slug === productSlug);
        if (!product) return res.status(404).send("Not found");

        let selectedVariant = product.variants?.[0];
        if (variantSlug) {
            const found = product.variants.find(v => v.slug === variantSlug);
            if (!found) return res.redirect(`/product/${product.slug}`);
            selectedVariant = found;
        }

        const stars = [1, 2, 3, 4, 5];
        res.render("product", {
            title: product.name,
            product,
            selectedVariant,
            comments,
            verify: true, // chưa mua hàng thì verify = false


            stars
        });
    }
}

export default siteController;