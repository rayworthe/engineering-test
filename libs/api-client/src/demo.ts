import { EurocampClient } from './client';
import { NotFoundError } from './errors/NotFoundError';

const main = async (): Promise<void> => {
    const client = new EurocampClient({
        logger: console,
        maxAttempts: 5,
    });

    console.log('Listing users (endpoint has 10% failure rate)...');
    const users = await client.users.list();
    console.log(`Got ${users.length} users. First:`, users[0]);

    console.log('\nListing parcs...');
    const parcs = await client.parcs.list();
    console.log(`Got ${parcs.length} parcs. First:`, parcs[0]);

    console.log('\nListing bookings (endpoint has 10% failure rate)...');
    const bookings = await client.bookings.list();
    console.log(`Got ${bookings.length} bookings. First:`, bookings[0]);

    try {
        await client.users.get('00000000-0000-0000-0000-000000000000');
    } catch (err) {
        if (err instanceof NotFoundError) {
            console.log('Correctly caught NotFoundError');
        } else {
            throw err;
        }
    }
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
