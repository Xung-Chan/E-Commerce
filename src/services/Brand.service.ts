import { create } from "express-handlebars";
import brandDao from "../daos/Brand.dao";
const brandService = {
    getAllBrands: async () => {
        return brandDao.findBy({});
    }
}
export default brandService;