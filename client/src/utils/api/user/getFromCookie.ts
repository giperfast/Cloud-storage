import 'server-only'
import { cookies } from 'next/headers';
import { cache } from 'react';

export const getUserFromCookie = cache(async () => {
    
    const cookieStore = cookies();
    const session = cookieStore.get('cloud_session')?.value
    
    if (!session) {
        return null;
    }
    
    const request = await fetch(`http://localhost:4000/auth?session=${session}`, {
        method: "GET",
        next: { revalidate: 10 }
        //cache: 'no-store'
    }).catch((error) => {
        console.log(error);
    });

    if (request?.status !== 200) {
        return null;
    }
    
    const user = await request.json();

    return user;
})
