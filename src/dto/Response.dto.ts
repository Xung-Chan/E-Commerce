import { OrderStatus } from "../utils/OrderStatus.enum.js";

class LoginResponseDto {
    accessToken: string;
    refreshToken: string;
    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}

interface CartResponse {
    items: Array<{
        cartItemId: string;
        variantId: string;
        variantIds: string[];
        productId: string;
        productName: string;
        productImage: string;
        distinctFeature: string;
        quantity: number;
        price: number;
        totalPrice: number;
    }>;
    totalProduct: number;
    total: number;
}

interface StatisticResponse {
    totalUsers: number;
    newUsers: number;
    totalOrders: number;
    revenue: number;
    topProducts: Array<{
        productId: string,
        productName: string,
        sold: number,

    }>
}

interface UserResponse {
    id: string;
    email: string;
    fullName: string;
    role: string;
    addresses: Array<{
        address: string;
    }>;
    status: string;
    point: number;
}


interface OutlineOrderResponse {
    id: string;
    userId: string;
    fullName: string;
    totalPrice: number;
    items:
    {
        productName: string;
        distinctFeature: string;
        quantity: number;
        price: number;
    }[]
    ,
    currentStatus: OrderStatus;
}

interface DetailOrderResponse {
    id: string;

    userId: string;
    fullName: string;
    email: string;
    address: string;

    status:
    {
        status: string;
        createdAt: Date;
    }[],

    items:
    {
        productName: string;
        distinctFeature: string;
        quantity: number;
        price: number;
    }[],
    totalPrice: number;
    totalDiscount: number;
    shippingFee: number;
    totalPay: number;
    shippingMethod: string;
}

export {
    LoginResponseDto
};
export type {
    CartResponse, DetailOrderResponse, OutlineOrderResponse, StatisticResponse,
    UserResponse
};

