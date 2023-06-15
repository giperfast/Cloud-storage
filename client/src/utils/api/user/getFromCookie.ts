import 'server-only'
import { cookies } from 'next/headers';
import { cache } from 'react';

export interface IUser {
    user_id: number,
    username: string,
    avatar: string
}

export const getUserFromCookie = async ()  => {
    
    const cookieStore = cookies();
    const session = cookieStore.get('cloud_session')?.value
    
    if (!session) {
        return null;
    }
    console.log('getti\'n user');
    
    const request = await fetch(`http://localhost:4000/auth?session=${session}`, {
        method: "GET",
        //next: { tags: ['user'] }
        next: { revalidate: 60 },
        //cache: 'no-store'
    }).catch((error) => {
        console.log(error);
    });

    if (request?.status !== 200) {
        return null;
    }
    
    const user: IUser = await request.json();

    return user;
}
