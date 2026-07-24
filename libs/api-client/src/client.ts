import { HttpClient, HttpClientConfig } from './http-client';
import { Bookings } from './resources/bookings';
import { Parcs } from './resources/parcs';
import { Users } from './resources/user';

const noopLogger: Pick<Console, 'warn' | 'debug'> = {
    warn: () => undefined,
    debug: () => undefined,
};

export class EurocampClient {
    readonly users: Users;
    readonly parcs: Parcs;
    readonly bookings: Bookings;

    constructor(options: Partial<HttpClientConfig> = {}) {
        const http = new HttpClient({
            baseUrl: options.baseUrl ?? 'http://localhost:3001/api/1',
            maxAttempts: options.maxAttempts ?? 4,
            baseDelayMs: options.baseDelayMs ?? 100,
            timeoutMs: options.timeoutMs ?? 5000,
            logger: options.logger ?? noopLogger,
        });

        this.users = new Users(http);
        this.parcs = new Parcs(http);
        this.bookings = new Bookings(http);
    }
};
