import { create } from "express-handlebars";
import brandDao from "../daos/Brand.dao";
const brandService = {
    createBrand: async (data: { name: string, description: string }) => {
        return brandDao.create(data);
    }
}
export default brandService;