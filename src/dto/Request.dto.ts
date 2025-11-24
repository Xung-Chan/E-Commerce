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
    couponId?: string | null;
    variants: {
        variantId: string;
        quantity: number;
    }[];
    address: string;
    shippingMethodId: string;
    isUseUserPoint: boolean;

}

interface CreateCommentRequest {
    userId?: string;
    productId: string;
    content: string;
}

interface CreateRatingRequest {
    userId: string;
    productId: string;
    rate: number;
}

export type {
    LoginRequest,
    CreateOrderRequest,
    CreateProductRequest,
    CreateCommentRequest,
    CreateRatingRequest
};