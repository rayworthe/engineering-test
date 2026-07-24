import { ApiClientError } from './ApiClientError';

export class NotFoundError extends ApiClientError {
    constructor(url?: string, cause?: unknown) {
        super('Resource not found', 404, url, cause);
        this.name = 'NotFoundError';
    }
};
