interface LoginRequest {
    email: string;
    password: string;
}
interface CreateProductRequest {
    name: string;
    brandId: string;
    categoryId: string;
    description: string;
    images: string[];
    variants: {
        distinctFeature: string;
        price: number;
        stock: number;
        discount?: number;
    }[];
}
interface CreateOrderRequest {
    userId: string;
    couponId?: string;
    variants: {
        variantId: string;
        quantity: number;
    }[];
    shippingMethod: string;
    paymentMethod: string;
}
export type {
    LoginRequest,
    CreateOrderRequest,
    CreateProductRequest
};