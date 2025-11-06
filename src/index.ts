import fs from "fs";
import path from "path";
import http from "http";
import morgan from "morgan";
import express from "express";
import { Server } from "socket.io"
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";

import { connect } from "./config/DB.js";
import { slugify } from './utils/slug.js';
import { userDao } from "./daos/User.dao.js";
import apiRouter from "./routes/Api.route.js";
import siteRouter from "./routes/Site.route.js";
import { uploadDir } from "./services/Image.service.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import socketService from "./services/Socket.service.js";
import commentService from "./services/Comment.service.js";
import { io } from "socket.io-client";
import { createApi } from "./utils/ApiClient.js";


const PORT = process.env.PORT || 8000;
const BASE_URL = `http://localhost:${PORT}`;
const app = express();
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser())

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        helpers: {
            json: (context: unknown) => JSON.stringify(context),
            formatPrice: (price: unknown) => {
                // Guard against undefined, null or non-numeric values to avoid runtime errors
                if (price === undefined || price === null || price === '') return '';
                const num = typeof price === 'number' ? price : Number(price as any);
                if (Number.isNaN(num)) return '';
                return num.toLocaleString('vi-VN');
            },
            truncate: (str: string, len: number) =>
                str && str.length > len ? str.substring(0, len) + '...' : str,
            eq: (a: any, b: any) => a === b,
            lte: (a: number, b: number) => a <= b,
            buildQuery: (obj: Record<string, unknown>) => {
                const params = Object.entries(obj).filter(([, v]) => v !== undefined && v !== '');
                return params.map(([k, v]) => `${k}=${encodeURIComponent(v as string)}`).join('&');
            },
            chunk: (array: any[], size: number) => {
                if (!array || !Array.isArray(array)) return [];
                const chunks = [];
                for (let i = 0; i < array.length; i += size) {
                    chunks.push(array.slice(i, i + size));
                }
                return chunks;
            },
            hasFieldError: (errors: any[], fieldName: string) => {
                if (!errors || !Array.isArray(errors)) return false;
                return errors.some(error => error.field === fieldName);
            },
            getFieldError: (errors: any[], fieldName: string) => {
                if (!errors || !Array.isArray(errors)) return '';
                const error = errors.find(error => error.field === fieldName);
                return error ? error.message : '';
            },
            times: (n: number, block: any) => {
                let result = '';
                for (let i = 0; i < n; i++) {
                    result += block.fn(i);
                }
                return result;
            },
            getCategoryIcon: (categoryName: string) => {
                const icons: Record<string, string> = {
                    'PC Gaming': 'bi-controller',
                    'PC Văn Phòng': 'bi-pc',
                    'Workstation': 'bi-diagram-3-fill',
                    'Linh kiện máy tính': 'bi-pc-display-horizontal',
                };
                return icons[categoryName] || 'bi-box-seam';
            },
            slugify: (str: string) => {
                if (!str) return '';
                return slugify(str);
            }
        }
    })
);

app.set("view engine", "hbs")
app.set("views", "./views")

app.use(siteRouter)

app.use("/api", apiRouter);

app.use(errorHandler)

const server = http.createServer(app);
const ioServer = new Server(server, {
    cors: {
        origin: "http://localhost:8000",
        methods: ["GET", "POST"],
    },
});


socketService.initSocket();

/// Mẫu realtime với Socket.io
app.get("/socket-test", async (req, res) => {
    const api = createApi(req);
    const productsRes = await api.get(`http://localhost:8000/api/comments`);
    const comments = productsRes.data?.data || [];
    console.log(comments);
    res.render("realtime_example_comment_rating", { layout: false, comments: comments })
});


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

connect()
    .then(() => {
        userDao.createAdmin()
        console.log("Admin user created or already exists")

    })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`🚀 Server running at ${BASE_URL}`);
        });
    })
    .catch(err => {
        console.error("Database connection error:", err)
        process.exit(1);
    })


export { ioServer };
