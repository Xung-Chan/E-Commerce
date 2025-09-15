import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";


import { connect } from "./config/DB.js";
import errorHandler from "./middleware/errorHandler.js";
import productRouter from "./routes/Product.route.js";

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
            truncate: (str: string, len: number) =>
                str && str.length > len ? str.substring(0, len) + '...' : str,
            eq: (a: any, b: any) => a === b
        }
    })
);

app.set("view engine", "hbs")
app.set("views", "./views")

app.use(siteRouter)
app.use(productRouter);

app.use("/api", apiRouter);
app.use(errorHandler)

connect()
    .then(() =>

        app.listen(8000, () => {
            console.log(`🚀 Server running at http://localhost:8000`);
        })


    )
    .catch(err => {
        console.error("Database connection error:", err)
        process.exit(1);
    })
