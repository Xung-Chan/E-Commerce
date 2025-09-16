import { upload } from "../services/Image.service.js";
export const uploadSingle = upload.single("image");
export const uploadMultiple = upload.array("images", 10);