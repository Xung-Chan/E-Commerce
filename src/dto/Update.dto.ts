interface UpdateVariantDto {
    distinctFeature?: string;
    price?: number;
    stock?: number;
}
interface UpdateUserDto {
    email?: string;
    fullName?: string;
}
interface UpdateBrandDto {
    name?: string;
    description?: string;
    image?: string;

}
interface UpdateCategoryDto {
    name?: string;
    description?: string;
    image?: string;
    landingPageDisplay?: boolean;
}
interface UpdateProductDto {
    name?: string;
    brandId?: string;
    categoryId?: string;
    description?: string;
    images?: string[];
    variants?: {
        distinctFeature: string;
        price: number;
        stock: number
    }[];
}
interface UpdateCouponDto {
    discount?: number;
    maxUse?: number;
    status?: "active" | "inactive";
}
export type {
    UpdateUserDto,
    UpdateBrandDto,
    UpdateProductDto,
    UpdateCategoryDto,
    UpdateVariantDto,
    UpdateCouponDto,
};