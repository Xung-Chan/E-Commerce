import { categoryDao, ICategory } from "../daos/Category.dao.js";
import { CreateCategoryDto } from "../dto/Create.dto.js";
import { UpdateCategoryDto } from "../dto/Update.dto.js";
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
    updateCategoryById: async (id: string, data: UpdateCategoryDto) => {
        return categoryDao.patchById(id, data);
    },
    getCategoriesForLandingPage: async () => {
        const categories: ICategory[] = await categoryDao.findBy({ landingPageDisplay: true });
        return categories;
    },
}
export default categoryService;