const categoryService = {
    createBrand: async (data: CreateBrandDto) => {
        return brandDao.create(data);
    },
    getAllBrands: async () => {
        return brandDao.findBy({});
    },
    getBrandById: async (id: string) => {
        return brandDao.readById(id);
    },
    deleteBrandById: async (id: string) => {
        return brandDao.deleteById(id);
    },
    updateBrandById: async (id: string, data: Partial<any>) => {
        return brandDao.patchById(id, data);
    }

}
export default categoryService;