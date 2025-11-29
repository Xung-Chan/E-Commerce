import { OrderStatus } from "../utils/OrderStatus.enum.js";

class LoginResponseDto {
    accessToken: string;
    refreshToken: string;
    role: string;
    constructor(accessToken: string, refreshToken: string, role: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.role = role;
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

interface SimpleStatisticResponse {
    totalUsers: number;
    newUsers: number;
    totalOrders: number;
    revenue: number;
    profit: number;
    topProducts: {
        productId: string,
        productName: string,
        image: string,
        sold: number,
    }[];
    accumulatedRevenue: {
        name: string,
        unit: string,
        values: number[]
        xaxis: string[]
    },
    accumulatedProfit: {
        name: string,
        unit: string,
        values: number[]
        xaxis: string[]
    }
}

interface AdvancedStatisticResponse {
    totalProfit: number,
    orders: {
        unit: string,
        name: string,
        values: number[],
        xaxis: string[]
    },
    revenues: {
        unit: string,
        name: string,
        values: number[],
        xaxis: string[]
    },
    profits: {
        unit: string,
        name: string,
        values: number[],
        xaxis: string[]
    }

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
    createdAt: Date;
    updatedAt: Date;
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
    nextStatus: string[];

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

interface RateResponse {
    id: string;
    userId: string;
    productId: string;
    fullName: string;
    rate: number;
    createdAt: Date;
}

export {
    LoginResponseDto
};
export type {
    CartResponse, DetailOrderResponse, OutlineOrderResponse, SimpleStatisticResponse, AdvancedStatisticResponse,
    UserResponse, RateResponse
};

