import { ApiError } from './ApiError';

export class RetryExhaustedError extends ApiError {
    constructor(
        public readonly attempts: number,
        public readonly lastError: Error,
        url?: string,
    ) {
        super(
            `Request failed after ${attempts} attempt(s): ${lastError.message}`,
            undefined,
            url,
            lastError,
        );
        this.name = 'RetryExhaustedError';
    }
};
