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

interface CreateCommentRequest {
    userId: string;
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