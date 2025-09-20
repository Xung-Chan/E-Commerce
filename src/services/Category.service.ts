import { categoryDao } from "../daos/Category.dao.js";
import { CreateCategoryDto } from "../dto/Create.dto.js";
const categoryService = {
    createCategory: async (data: CreateCategoryDto) => {
        return categoryDao.create(data);
    },
    getAllCategories: async () => {
        return categoryDao.list();
    },
    getCategoryById: async (id: string) => {
        return categoryDao.readById(id);
    },
    deleteCategoryById: async (id: string) => {
        return categoryDao.deleteById(id);
    },
    updateCategoryById: async (id: string, data: Partial<CreateCategoryDto>) => {
        return categoryDao.patchById(id, data);
    }
}
export default categoryService;