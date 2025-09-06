import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import { connect } from "./config/DB.js";
import errorHandler from "./middleware/errorHandler.js";
import authRouter from "./routes/Auth.route.js";
import userRouter from "./routes/User.route.js";

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
app.use("/users", userRouter);

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
