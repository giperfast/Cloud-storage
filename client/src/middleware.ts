import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userLogout } from './utils/api/user/logout';
import { getUserFromSession } from './utils/api/user/getFromSession';
//import { useRouter } from 'next/navigation';
import { getUserFromCookie } from './utils/api/user/getFromCookie';
import { revalidateTag } from 'next/cache';

const guestRoutes = [
    '/login',
    '/register',
];

const userRoutes = [
    '/cloud',
];

export async function middleware(request: NextRequest) {
    const session: any = request.cookies.get('cloud_session')?.value;
    const user = await getUserFromSession(session);
    
    for (let i = 0; i < guestRoutes.length; i++) {
        const guestRoute = guestRoutes[i];
        
        if (request.nextUrl.pathname.startsWith(guestRoute)) {
            if (user) {
                return NextResponse.redirect(new URL('/cloud', request.url))
            }
        }
    }

    for (let i = 0; i < userRoutes.length; i++) {
        const userRoute = userRoutes[i];
        
        if (request.nextUrl.pathname.startsWith(userRoute)) {
            if (!user) {
                //revalidateTag('user');
                return NextResponse.rewrite(new URL('/login', request.url));
            }
        }
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.nextUrl.pathname);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
}