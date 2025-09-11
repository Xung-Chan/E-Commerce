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
import apiRouter from "./routes/Api.route.js";
import siteRouter from "./routes/Site.route.js";

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
            formatPrice: (price: number) => price.toLocaleString('vi-VN'),
        }
    })
);

app.set("view engine", "hbs")
app.set("views", "./views")

app.use(siteRouter)
app.use("/api", apiRouter);


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
