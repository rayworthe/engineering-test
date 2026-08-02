import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const proxy = (request: NextRequest) => {
    const headers = new Headers(request.headers);
    headers.set('x-current-path', request.nextUrl.pathname);
    return NextResponse.next({ headers });
};

const getPathname = async () => {
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");
    return pathname;
};

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export { proxy, getPathname };
