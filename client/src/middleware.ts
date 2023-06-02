import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userLogout } from './utils/api/user/logout';
import { getUserFromSession } from './utils/api/user/getFromSession';

const guestRoutes = [
    '/login',
    '/register',
];

const userRoutes = [
    '/cloud',
];

export async function middleware(request: NextRequest, response: NextResponse) {

    const session = request.cookies.get('cloud_session')?.value;
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
                return NextResponse.rewrite(new URL('/login', request.url));
            }
        }
    }

}