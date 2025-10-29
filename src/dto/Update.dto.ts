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
interface UpdateOrderDto {
    currentStatus: string;
    statusHistories: { status: string; date: Date }[];
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

export type {
    UpdateUserDto,
    UpdateBrandDto,
    UpdateOrderDto,
    UpdateProductDto,
    UpdateCategoryDto,
    UpdateVariantDto
};