import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userLogout } from './utils/api/user/logout';

export async function middleware(request: NextRequest, response: NextResponse) {
    console.log(request.url, request.url.endsWith('/logout'))

    /*if (request.url.endsWith('/logout')) {
        return NextResponse.redirect(new URL('/', request.url))
    }*/

    /*if (request.nextUrl.pathname.startsWith('/logout')) {
        let response = NextResponse.next();
        let session = request.cookies.get('cloud_session')?.value;

        await userLogout(session);

        response.cookies.set({
            name: 'cloud_session',
            value: '',
            path: '/',
        });
        console.log('LOGOUT!!!!');
        
        return response;   
    }*/
}