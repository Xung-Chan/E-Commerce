import mongoose from "mongoose";

interface CreateUserDto {
    email: string;
    password: string | null;
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
    userId?: string;
    fullName?: string;
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
    couponId?: string | null;
    totalPrice: number;
    totalDiscount: number;
    totalPay: number;
    shippingFee: number;
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
    discount?: number;
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
    CreateUserDto,
    CreateBrandDto,
    CreateCategoryDto,
    CreateCommentDto,
    CreateRateDto,
    CreateCouponDto,
    CreateOrderDto,
    CreateProductDto,
    CreateCartItemDto,
    CreateVariantDto,
    CreateOrderItemDto
};