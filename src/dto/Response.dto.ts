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
export {
    LoginResponseDto,
};
export type { CartResponse };
