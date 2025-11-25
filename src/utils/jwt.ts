export interface TokenPayload {
    userId: string;
    email: string;
    type?: 'access' | 'refresh' | 'reset';
    role: 'user' | 'admin' | 'anonymous';
}