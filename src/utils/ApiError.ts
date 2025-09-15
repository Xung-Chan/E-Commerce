class ApiError extends Error {
    title: string
    statusCode: number
    constructor(
        statusCode: number,
        title: string,
        message: string,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.title = title;
    }
    json() {
        return {
            success: false,
            status: this.statusCode,
            title: this.title,
            message: this.message,
            stack: this.stack
        }
    }
}

export default ApiError;