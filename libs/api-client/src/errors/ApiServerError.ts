import { ApiError } from './ApiError';

export class ApiServerError extends ApiError {
    constructor(message: string, status?: number, url?: string, cause?: unknown) {
        super(message, status, url, cause);
        this.name = 'ApiServerError';
    }
};
