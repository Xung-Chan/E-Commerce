import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 } from "uuid";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../../public/uploads/');
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