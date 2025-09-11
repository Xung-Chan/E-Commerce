//Front-end
import siteRouter from "../routes/Site.route.js";
import { products } from "../sampleData.js";
import { Request, Response } from "express";
const siteController = {
    home: (req: Request, res: Response) => {
        // Lấy dữ liệu mẫu
        const newProducts = products.slice(-10);

        const bestSellersProducts = products.slice(0, 10);
        const pcGamingProducts = products.filter(p => p.type === "PC Gaming").slice(0, 10);
        const workstationProducts = products.filter(p => p.type === "Workstation").slice(0, 10);
        const componentsProducts = products.filter(p => p.type === "RAM" || p.type === "Storage" || p.type === "Power" || p.type === "Mainboard" || p.type === "VGA").slice(0, 10);

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
            
            // Sample
            products_catalog: products.slice(0, 9)
        });
    }
}
export default siteController;