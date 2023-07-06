'use server'
import { cookies } from 'next/headers';
import { IFile } from '@/types/file';
import axios from 'axios';

export const getFiles = async (type: string = 'all', path:string = ''): Promise<Array<IFile>> => {
    const cookieStore = cookies();
    const session = cookieStore.get('cloud_session')?.value
    
    if (!session) {
        return [];
    }

    console.log(path);

    /*var data = new URLSearchParams();
    data.append('type', type);
    for (const folder of path) {
        data.append('folder[]', folder);
    }*/

    const request = await fetch(`http://localhost:4000/files?type=${type}&path=${path}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`,
        },
        next: { tags: ['files'] },
    }).catch((error) => {
        console.log(error);
    });

    if (request?.status !== 200) {
        return [];
    }

    return await request.json();
}