import SortOption from "./SortOption";

interface Pagination {
    page: number;
    totalPages: number;
    limit: number;
    totalDatas: number;
    datas: any[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
}
interface QueryOptions {
    page?: number;
    limit?: number;
    sortBy?: SortOption;
    name?: string;
    categoryId?: string;
    brandId?: string;
    minPrice?: number;
    maxPrice?: number;
}
export default Pagination;