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

export {
    LoginResponseDto,
};
export type {
    CartResponse,
    StatisticResponse
};
