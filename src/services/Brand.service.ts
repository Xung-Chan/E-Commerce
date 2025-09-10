import brandDao from "../daos/Brand.dao.js";
const brandService = {
    getAllBrands: async () => {
        return brandDao.findBy({});
    }
}
export default brandService;