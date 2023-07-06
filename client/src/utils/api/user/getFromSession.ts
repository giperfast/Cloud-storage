//'use server'
import { IUser } from '@/types/user';
import { cache } from 'react';

export const getUserFromSession = async (session: string): Promise<IUser|null> => {
    
    if (!session) {
        return null;
    }
    
    const request = await fetch(`http://localhost:4000/auth?session=${session}`, {
        method: "GET",
        next: { revalidate: 60 },
        //cache: 'no-store'
    }).catch((error) => {
        console.log(error);
    });

    if (request?.status !== 200) {
        return null;
    }

    return await request.json();
}
