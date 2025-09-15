import ApiError from "./ApiError";

class SortOption {
    private readonly fields = ["rate", "soldCount", "onSale"]
    field: string;
    order: 1 | -1
    constructor(field: string, order: 1 | -1) {
        if (!this.fields.includes(field)) {
            throw new ApiError(400, "Bad Request", "Invalid sort field");
        }
        this.field = field;
        this.order = order;
    }
    toQuery() {
        return {
            [this.field]: this.order
        };
    }
}
export default SortOption;