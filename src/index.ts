import express, { Request, Response } from "express";
import { engine } from "express-handlebars"
import { connect } from "./config/DB.js"
import User from "./models/User.model.js"
import userRouter from "./routes/User.route.js";
const app = express()
app.engine("hbs", engine({
    extname: "hbs"
}))
app.set("view engine", "hbs")
app.set("views", "./views")

app.listen(8000, () => {
    console.log("Server is running...")
    connect()
        .then(() => console.log("Database connected..."))
        .then(() => {
            app.use("/users", userRouter);

        })
        .catch(err => {
            console.error("Database connection error:", err)
        })

})