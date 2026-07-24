/** Public API for the Eurocamp API client */
export { EurocampClient } from './client';
export { HttpClient } from './http-client';
export type { HttpClientConfig, HttpMethod } from './http-client';

/** Resource classes */
export { Users } from './resources/user';
export { Parcs } from './resources/parcs';
export { Bookings } from './resources/bookings';
export * from './resources/types';

/** Error classes */
export { ApiError } from './errors/ApiError';
export { ApiClientError } from './errors/ApiClientError';
export { ApiServerError } from './errors/ApiServerError';
export { NotFoundError } from './errors/NotFoundError';
export { RetryExhaustedError } from './errors/RetryExhaustedError';
