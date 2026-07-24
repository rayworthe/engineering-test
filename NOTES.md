Task 1 - Database issues

After taking a look at the data, the 3 models and reading up on the TypeORM documentation;

 - There are inconsistent primary key types, parcs use integers, users/bookings use UUIDs. We could create a base entity file and use `@PrimaryGeneratedColumn('uuid') id: string` (or whatever we want the standard to be) so every table follows the same convention

 - No foreign keys, which has actually caused some bogus data it seems, since bookings reference parc UUIDs that don't exist in the parcs table (which uses integer primary keys). Proper relations would be defined with `@ManyToOne` / `@JoinColumn`

 - `bookingdate` stored as `varchar`, should be `timestamptz` or `date`

 - `users.email` has no UNIQUE constraint

 - The PK columns are indexed, but `bookings.user` and `bookings.parc` have no indexes. We should add indexes on those columns to keep reads performant

 - `booking.comments` marked optional in TS but NOT NULL in DB. The field needs to be marked as `nullable: true` in the entity

 - No audit columns `created_at`, `updated_at`. This could be solved by adding a base entity as mentioned above, so we can have common fields throughout. While this isn't essential, it does help with traceability

 - No unique / business constraints on `parcs.name`. Maybe this was intentional, but thought I would mention since to me a parc name seems like it should be unique

 - Naming, `bookingdate` should be `booking_date`. While not essential, it's good to stick to convention

---

Task 2 - Latest Practices

- React Server Components (RSC) - With Next.js App Router, the default for data fetching is now on the server. Only use 'use client' where interactivitry is required

- Optimistic UI - Frameworks like TanStack Query and React's `useOptimistic` hook allow mutations to update the UI immediately while the server catches up

- CI quality gates - Linting, type-checking, and tests run on every PR. No merge without green checks

---

- Task 3 - Created an api client solution

I have  created an API client to make requests to our small (flaky) API server ha!

It lives in lib/api-client. I'm not so familiar with Nx, but I thought separating it into its own folder under lib was the right approach so it can exist as its own package and be reused across the workspace.

It includes;

- `http-client.ts` - a low-level fetch wrapper that handles retries, timeouts, and error handling
- Exponential backoff with jitter on retries (safe methods only - GET, PUT, DELETE)
- A typed error hierarchy: `NotFoundError`, `ApiServerError`, `ApiClientError`, `RetryExhaustedError`
- Resource classes for each entity (`Users`, `Parcs`, `Bookings`) with full CRUD
- `demo.ts` - a runnable script that exercises all three resources and demonstrates error handling
- `client.test.ts` - unit tests covering the 404 and retry/recovery scenarios

---

Running the demo and tests

Make sure the API server is running first: `docker-compose up -d --force-recreate`
And the data is seeded, as per instructions in README

```bash
cd libs/api-client

pnpm install

# Run the demo (calls the live API)
pnpm demo

# Run the tests
pnpm test
```
