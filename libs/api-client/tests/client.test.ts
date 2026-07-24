import { EurocampClient } from '../src/client';

const mockResponse = (status: number, body: unknown) => {
    return {
        ok: status >= 200 && status < 300,
        status,
        json: async () => body,
    } as Response;
};

const mockError = (status: number) => {
    return {
        ok: false,
        status,
        json: async () => ({}),
    } as Response;
};

const getGlobalFetch = (): jest.Mock => {
    return global.fetch as unknown as jest.Mock;
};

describe('EurocampClient', () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
        // consistent jitter for backoff delay
        jest.spyOn(global.Math, 'random').mockReturnValue(0);
        global.fetch = jest.fn() as unknown as typeof fetch;
    });

    afterEach(() => {
        jest.restoreAllMocks();
        global.fetch = originalFetch;
    });

    test('404 thrown when invalid user is queried', async () => {
        getGlobalFetch().mockResolvedValueOnce(mockError(404));

        const client = new EurocampClient({ baseDelayMs: 0 });

        await expect(() => client.users.get('invalid-user-id')).rejects.toThrow('Resource not found');
        expect(getGlobalFetch()).toHaveBeenCalledTimes(1);
    });

    test('retry logic works for 500 errors', async () => {
        const mockUser =  { id: 'user-id', name: 'John Doe', email: 'john.doe@example.com' };

        getGlobalFetch().mockResolvedValueOnce(mockError(500))
            .mockResolvedValueOnce(mockError(500))
            .mockResolvedValueOnce(mockResponse(200, mockUser));

        const client = new EurocampClient({ baseDelayMs: 0 });

        const user = await client.users.get('user-id');

        expect(user).toEqual(mockUser);
    });
});
