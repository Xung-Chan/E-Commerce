interface CreateUserDto {
    email: string;
    password: string;
    fullName: string;
    address: string;
}
interface CreateBrandDto {
    name: string;
    description: string;
    image: string;
}
interface CreateCategoryDto {
    name: string;
    description: string;
    image: string;
}
interface CreateCommentDto {
    userId: string;
    productId: string;
    content: string;
}
interface CreateCouponDto {
    code: string;
    discount: number;
    maxUse: number;
}
interface CreateOrderDto {
    userId: string;
    products: [
        {
            productId: string;
            variantId: string;
            quantity: number;
        }
    ];
    totalPrice?: number;
    totalDiscount?: number;
    totalPay?: number;
}
interface CreateProductDto {
    name: string;
    brandId: string;
    categoryId: string;
    description: string;
    images: string[];
    variants: {
        distinctFeature: string;
        price: number;
        stock: number
    }[];
}
interface CreateRateDto {
    userId: string;
    productId: string;
    rate: number;
}
interface CreateCartItemDto {
    userId: string;
    productId: string;
    variantId: string;
    quantity: number;
}
export type {
    CreateUserDto,
    CreateBrandDto,
    CreateCategoryDto,
    CreateCommentDto,
    CreateRateDto,
    CreateCouponDto,
    CreateOrderDto,
    CreateProductDto,
    CreateCartItemDto
};