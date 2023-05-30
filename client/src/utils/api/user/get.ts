import 'server-only'
import { cookies } from 'next/headers';
//import { cache } from 'react';

export const getUser = async () => {
    
    const cookieStore = cookies();
    const cloud_session = cookieStore.get('cloud_session')?.value
    
    if (!cloud_session) {
        return null;
    }
    
    const request = await fetch(`http://localhost:4000/auth?session=${cloud_session}`, {
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
    
    //console.log(user);
    

    return user;
}
