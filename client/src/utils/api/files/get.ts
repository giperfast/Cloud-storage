'use server'
import 'server-only'
import { cookies } from 'next/headers';
import { cache } from 'react';


export const getFiles = cache(async ()  => {
    
    const cookieStore = cookies();
    const session = cookieStore.get('cloud_session')?.value
    
    if (!session) {
        return null;
    }

    const request = await fetch('http://localhost:4000/files', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`,
        },
        next: { revalidate: 60 },
    }).catch((error) => {
        console.log(error);
    });

    if (request?.status !== 200) {
        return null;
    }
    
    const files = await request.json();

    return files;
})