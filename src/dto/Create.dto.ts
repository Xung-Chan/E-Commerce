
interface CreateUserDto {
    email: string;
    password?: string | null;
    fullName: string;
    address?: string;
}
interface CreateBrandDto {
    name: string;
    description: string;
    image: string;
}

interface CreateImportDto {
    variantId: string;
    quantity: number;
    price: number;
}


interface CreateCategoryDto {
    name: string;
    description: string;
    image: string;
}
interface CreateCommentDto {
    userId?: string;
    fullName?: string;
    productId: string;
    content: string;
    summary: string;
    type: "positive" | "neutral" | "negative";
}
interface CreateCouponDto {
    code?: string;
    discount: number;
    maxUse: number;
}
interface CreateOrderDto {
    userId: string;
    couponId?: string | null;
    totalPrice: number;
    totalDiscount: number;
    totalPay: number;
    shippingFee: number;
    tax: number;
    shippingMethod: string;
    address: string;
}
interface CreateProductDto {
    name: string;
    brandId: string;
    categoryId: string;
    description: string;
    images: string[];
    minPrice: number;
    maxPrice: number;

}
interface CreateRateDto {
    userId: string;
    fullName: string;
    productId: string;
    rate: number;
}
interface CreateCartItemDto {
    userId: string;
    productId: string;
    variantId: string;
    quantity: number;
}
interface CreateVariantDto {
    productId: string;
    distinctFeature: string;
    price: number;
    stock: number;
}
interface CreateOrderItemDto {
    orderId?: string | null;
    variantId: string;
    quantity: number;
    price: number;
    discount?: number;
}
export type {
    CreateBrandDto, CreateCartItemDto, CreateCategoryDto,
    CreateCommentDto, CreateCouponDto, CreateImportDto, CreateOrderDto, CreateOrderItemDto, CreateProductDto, CreateRateDto, CreateUserDto, CreateVariantDto
};
