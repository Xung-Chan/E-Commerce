import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import { connect } from "./config/DB.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import productRouter from "./routes/Product.route.js";

// Lấy Data mẫu (Xóa sau khi có DB)
import apiRouter from "./routes/Api.route.js";
import siteRouter from "./routes/Site.route.js";
import { userDao } from "./daos/User.dao.js";
import { uploadDir } from "./services/Image.service.js";

const PORT = process.env.PORT || 8000;
const BASE_URL = `http://localhost:${PORT}`;
const app = express()
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
            eq: (a: any, b: any) => a === b,
            lte: (a: number, b: number) => a <= b,
            buildQuery: (obj: Record<string, unknown>) => {
                const params = Object.entries(obj).filter(([, v]) => v !== undefined && v !== '');
                return params.map(([k, v]) => `${k}=${encodeURIComponent(v as string)}`).join('&');
            }
        }
    })
);

app.set("view engine", "hbs")
app.set("views", "./views")

app.use(siteRouter)

app.use("/api", apiRouter);
app.use(errorHandler)
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
connect()
    .then(() => {
        userDao.createAdmin()
        console.log("Admin user created or already exists")

    })
    .then(() => {

        app.listen(PORT, () => {
            console.log(`🚀 Server running at ${BASE_URL}`);
        })
    })
    .catch(err => {
        console.error("Database connection error:", err)
        process.exit(1);
    })
