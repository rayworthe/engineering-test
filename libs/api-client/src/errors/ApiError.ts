export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status?: number,
        public readonly url?: string,
        public readonly cause?: unknown,
    ) {
        super(message);
        this.name = 'ApiError';
    }
};
