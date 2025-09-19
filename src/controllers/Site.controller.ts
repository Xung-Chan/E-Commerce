//Front-end
import axios from "axios";

import { products, comments } from "../sampleData.js";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Pagination } from "../utils/Pagination.js";

const apiUrl = process.env.BASE_URL;

const siteController = {
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

    login: (req: Request, res: Response) => {
        res.render('login', {
            title: 'Đăng nhập | CoreStation'
        });
    },

    register: (req: Request, res: Response) => {
        res.render('register', {
            title: 'Đăng ký | CoreStation'
        });
    },

    catalog: async (req: Request, res: Response) => {
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 9;

        const allProductsRes = await axios.get(`${apiUrl}/api/products`);
        const products = Array.isArray(allProductsRes.data) ? allProductsRes.data : allProductsRes.data.data;
        const totalDatas = products.length;

        const start = (page - 1) * limit;
        const end = start + limit;
        const datas = products.slice(start, end);

        const pagination = new Pagination(datas, page, limit, totalDatas);

        // Get all categories
        const categoriesRes = await axios.get(`${apiUrl}/api/categories`);
        const categories = Array.isArray(categoriesRes.data) ? categoriesRes.data : categoriesRes.data.data;

        res.render('catalog', {
            title: 'Danh mục sản phẩm | CoreStation',
            categories: categories,

            products_catalog: pagination.datas,
            pages: Array.from({ length: pagination.totalPages }, (_, i) => ({
                number: i + 1,
                active: i + 1 === pagination.page
            })),
            isFirstPage: pagination.page === 1,
            isLastPage: pagination.page === pagination.totalPages,
            prevPage: pagination.prevPage,
            nextPage: pagination.nextPage,
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