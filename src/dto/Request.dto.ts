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
    discount?: number;
    variants: {
        distinctFeature: string;
        price: number;
        stock: number;
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

interface UpdateProductRequest {
    name?: string;
    brandId?: string;
    categoryId?: string;
    description?: string;
    images?: string[];
    discount?: number;
    variants?: {
        id: string;
        distinctFeature?: string;
        price?: number;
        stock?: number;
    }[]
}

export type {
    LoginRequest,
    CreateOrderRequest,
    CreateProductRequest,
    CreateCommentRequest,
    CreateRatingRequest,
    UpdateProductRequest
};