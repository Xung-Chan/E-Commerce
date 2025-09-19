import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 } from "uuid";
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadDir = path.join(__dirname, '../../public/uploads/');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const fileName = v4() + path.extname(file.originalname);
        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });
const UPLOAD_DIR = "/uploads/";
const imageService = {

}
export {
    imageService,
    UPLOAD_DIR,
    upload

} 