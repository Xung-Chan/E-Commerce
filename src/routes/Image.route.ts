import { Router } from "express";
import { upload } from "../services/Image.service.js";
import imageController from "../controllers/Image.controller.js";
const imageRouter = Router();
imageRouter.post("/", upload.single("image"), imageController.uploadImage);
export default imageRouter;