'use server'
import axios from 'axios';
import { cookies } from 'next/headers';

export const createFolder = async (name:string, path:string = []) => {
    const cookieStore = cookies();
    const session = cookieStore.get('cloud_session')?.value

    if (!session) {
        return false;
    }
    
   /* var data = new URLSearchParams();
    for (const folder of path) {
        data.append('folder[]', folder);
    }*/

    await fetch(`http://localhost:4000/files/create-folder?name=${name}&path=${path}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`,
        },
    }).catch((error) => {
        console.log(error);
    });
}