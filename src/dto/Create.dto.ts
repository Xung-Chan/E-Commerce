interface CreateUserDto {
    email: string;
    password: string;
    fullName: string;
    address: string;
}
interface CreateBrandDto {
    name: string;
    description: string;
}
interface CreateCategoryDto {
    name: string;
    description: string;
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
            quantity: number;
            price: number;
            discount: number;
        }
    ];
    totalPrice: number;
    totalDiscount: number;
    taxe: number;
    totalPay: number;
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

export type {
    CreateUserDto,
    CreateBrandDto,
    CreateCategoryDto,
    CreateCommentDto,
    CreateRateDto,
    CreateCouponDto,
    CreateOrderDto,
    CreateProductDto
};