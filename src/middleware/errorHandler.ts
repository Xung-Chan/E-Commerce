import { Request, Response, NextFunction } from 'express';
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    switch (statusCode) {
        case 400:
            res.json({ title: 'Bad Request', message: err.message, stack: err.stack });
            break;
        case 401:
            res.json({ title: 'Unauthorized', message: err.message, stack: err.stack });
            break;
        case 403:
            res.json({ title: 'Forbidden', message: err.message, stack: err.stack });
            break;
        case 404:
            res.json({ title: 'Not Found', message: err.message, stack: err.stack });
            break;
        case 405:
            res.json({ title: 'Method Not Allowed', message: err.message, stack: err.stack });
        default:
            res.status(500).json({ title: 'Internal Server Error', message: err.message, stack: err.stack });
    }
}

export default errorHandler;