import { EurocampClient } from 'eurocamp-api-client';

export const euroClientApi = new EurocampClient({
    maxAttempts: 3,
    baseDelayMs: 1000,
    timeoutMs: 5000,
});
