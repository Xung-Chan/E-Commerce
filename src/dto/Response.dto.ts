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
        productId: string;
        product: string;
        variant: string;
        quantity: number;
    }>;
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
