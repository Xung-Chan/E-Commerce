import express from "express";
import { engine } from "express-handlebars";
import { connect } from "./config/DB.js";
import User from "./models/User.js";
const app = express();
app.engine("hbs", engine({
    extname: "hbs"
}));
app.set("view engine", "hbs");
app.set("views", "./views");
app.get("/", (req, res) => res.status(200).json({ statusCode: "500" }));
app.listen(8000, () => {
    connect();
    console.log("Server is running...");
});
//# sourceMappingURL=index.js.map