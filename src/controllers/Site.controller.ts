//Front-end
import { Request, Response } from "express";
import { bestSellersProducts, componentsProducts, newProducts, pcGamingProducts, products, workstationProducts } from "../sampleData.js";
const siteController = {
    home: (req: Request, res: Response) => {
        // New Products
        const newProductsWindowSize = 4;
        const windowNewProducts = [];
        for (let i = 0; i < newProducts.length; i += newProductsWindowSize) {
            let window = newProducts.slice(i, i + newProductsWindowSize);
            if (window.length < newProductsWindowSize) {
                window = window.concat(newProducts.slice(0, newProductsWindowSize - window.length));
            }
            windowNewProducts.push(window);
        }

        // Các Carousel khác
        const windowSize = 6;
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

        // Render
        res.render('home', {
            title: 'CoreStation - PC và linh kiện máy tính',

            bestSellersProducts: bestSellersProducts,
            windowNewProducts: windowNewProducts,
            windowPCGamingProducts: windowPCGamingProducts,
            windowWorkstationsProducts: windowWorkstationProducts,
            windowComponentsProducts: windowComponentsProducts
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
    catalog: (req: Request, res: Response) => {
        res.render('catalog', {
            title: 'Danh mục sản phẩm | CoreStation',
            products
        });
    }
}
export default siteController;