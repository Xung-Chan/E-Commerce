import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
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

const app = express()
app.engine("hbs", engine({
    extname: "hbs"
}))
app.set("view engine", "hbs")
app.set("views", "./views")
app.use(express.json())


app.get("/", (req: Request, res: Response) => {
    res.render("home")
})


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


app.get("/wtf", async (req: Request, res: Response) => {
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
