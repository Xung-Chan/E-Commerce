import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";


import { connect } from "./config/DB.js";
import errorHandler from "./middleware/errorHandler.js";
import authRouter from "./routes/Auth.route.js";
import brandRouter from "./routes/Brand.route.js";
import catalogRouter from "./routes/Catalog.route.js";
import userRouter from "./routes/User.route.js";
import categoryRouter from "./routes/Category.route.js";
import commentRouter from "./routes/Comment.route.js";
import couponRouter from "./routes/Coupon.route.js";
import orderRouter from "./routes/Order.route.js";
import productRouter from "./routes/Product.route.js";
import rattingRouter from "./routes/Ratting.route.js";
import axios from "axios";

// Lấy Data mẫu (Xóa sau khi có DB)
import { bestSellersProducts, newProducts, pcGamingProducts, workstationProducts, componentsProducts, products } from "./sampleData.js";

const app = express()
const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan("dev"));
app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")));

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        helpers: {
            json: (context: unknown) => JSON.stringify(context),
        }
    })
);

app.set("view engine", "hbs")
app.set("views", "./views")

// -------------------------------------------------------------------------------------------------------
// UI
// Landing Page
app.get("/", (req: Request, res: Response) => {
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
})

// Login
app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Đăng nhập | CoreStation'
    });
});

// Register
app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Đăng ký | CoreStation'
    });
});

// Catalog
app.get('/catalog', (req, res) => {
    res.render('catalog', {
        title: 'Danh mục sản phẩm | CoreStation',
        products
    });
});

// -------------------------------------------------------------------------------------------------------

app.use("/auth", authRouter);
app.use("/brands", brandRouter);
app.use("/catalogs", catalogRouter);
app.use("/categories", categoryRouter);
app.use("/comments", commentRouter);
app.use("/coupons", couponRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);
app.use("/ratings", rattingRouter);
app.use("/users", userRouter);


app.get("/wth", async (req: Request, res: Response) => {
    await axios.get("http://localhost:8000/users")
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
})
app.use(errorHandler)


connect()
    .then(() =>

        app.listen(8000, () => {
            console.log("Server is running...")
        })


    )
    .catch(err => {
        console.error("Database connection error:", err)
        process.exit(1);
    })
