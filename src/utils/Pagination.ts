
class Pagination {
    page: number;
    totalPages: number;
    limit: number;
    totalDatas: number;
    datas: any[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
    constructor(datas: any[], page: number = 1, limit: number = 10, totalDatas: number) {
        this.page = page;
        this.limit = limit;
        this.totalDatas = totalDatas;
        this.totalPages = Math.ceil(this.totalDatas / this.limit);
        this.datas = datas;
        this.hasNextPage = page < this.totalPages;
        this.hasPrevPage = page > 1;
        this.nextPage = this.hasNextPage ? page + 1 : null;
        this.prevPage = this.hasPrevPage ? page - 1 : null;
    }
}
interface QueryUrl {
    //page
    page?: string;
    limit?: string;

    //sort
    sortBy?: string;
    sortOrder?: "asc" | "desc";

    //filter
    name?: string;
    categoryId?: string;
    brandId?: string;
    minPrice?: string;
    maxPrice?: string;
}
export {
    Pagination
};

export type {
    QueryUrl
};
