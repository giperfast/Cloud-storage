'use server'
import 'server-only'
import { cookies } from 'next/headers';
import { cache } from 'react';
import { IUser } from '@/types/user';

export const getUserFromCookie = async (): Promise<IUser|null>  => {
    const cookieStore = cookies();
    const session = cookieStore.get('cloud_session')?.value
    
    if (!session) {
        return null;
    }
    console.log('getti\'n user');
    
    const request = await fetch(`http://localhost:4000/auth?session=${session}`, {
        method: "GET",
        next: { revalidate: 60, tags: ['user'] },
    }).catch((error) => {
        console.log(error);
    });

    if (request?.status !== 200) {
        return null;
    }

    return await request?.json();
}
