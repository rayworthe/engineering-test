import { ApiClientError } from './errors/ApiClientError';
import { ApiError } from './errors/ApiError';
import { ApiServerError } from './errors/ApiServerError';
import { NotFoundError } from './errors/NotFoundError';
import { RetryExhaustedError } from './errors/RetryExhaustedError';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface HttpClientConfig {
    baseUrl: string,
    maxAttempts: number,
    baseDelayMs: number,
    timeoutMs: number,
    logger: Pick<Console, 'warn' | 'debug'>,
};

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export class HttpClient {
    private readonly config: HttpClientConfig;

    constructor(config: HttpClientConfig) {
        this.config = config;
    }

    public async request<T>(method: HttpMethod, path: string, body?: unknown): Promise<T> {
        const config = this.config;
        const url = `${config.baseUrl}${path}`;
        const safeToRetry = ['GET', 'HEAD', 'DELETE', 'PUT'].includes(method);
        const attempts = safeToRetry ? this.config.maxAttempts : 1;

        let lastError: Error | undefined;
        for (let attempt = 1; attempt <= attempts; attempt++) {
            try {
                return await this.doFetch<T>(method, url, body);
            } catch (err) {
                if (err instanceof ApiClientError) {
                    throw err;
                }

                const parsed = err instanceof Error ? err : new Error(String(err));

                lastError = parsed;
                config.logger.warn(
                    `[HttpClient] ${method} ${path} failed on attempt ${attempt}/${attempts}: ${parsed.message}`,
                );

                if (attempt < attempts) {
                    const delay = this.backoffDelay(attempt);
                    config.logger.debug(`[HttpClient] retrying in ${delay}ms...`);
                    await sleep(delay);
                }
            }
        }

        if (attempts === 1) {
            throw lastError!;
        }

        throw new RetryExhaustedError(attempts, lastError!, url);
    };

    private async doFetch<T>(method: HttpMethod, url: string, body?: unknown): Promise<T> {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);

        let res: Response;
        try {
            res = await fetch(url, {
                method,
                headers: {
                    Accept: 'application/json',
                    ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
                },
                body: body !== undefined ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            throw new ApiServerError(`Network error: ${message}`, undefined, url, err);
        } finally {
            clearTimeout(timeout);
        }

        if (!res.ok) {
            throw this.parseError(res, url);
        }

        // Handle 204 No Content
        if (res.status === 204) {
            return undefined as T;
        }

        return (await res.json()) as T;
    };

    private parseError(res: Response, url: string): ApiError {
        const { status } = res;

        // Dont retry 404, point
        if (status === 404) {
            return new NotFoundError(url);
        }

        // Only retry if server side
        if (status >= 400 && status < 500 && status !== 429) {
            return new ApiClientError(`Client error ${status}`, status, url);
        }

        return new ApiServerError(`Server error ${status}`, status, url);
    };

    private backoffDelay(attempt: number): number {
        const exp = this.config.baseDelayMs * 2 ** (attempt - 1);
        return Math.floor(Math.random() * exp);
    };
};
