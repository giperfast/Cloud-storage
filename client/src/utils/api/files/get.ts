'use server'
import { cookies } from 'next/headers';
import { IFile } from '@/types/file';

export const getFiles = async (type: string = 'all'): Promise<Array<IFile>|null> => {
    const cookieStore = cookies();
    const session = cookieStore.get('cloud_session')?.value
    
    if (!session) {
        return null;
    }

    const request = await fetch(`http://localhost:4000/files?type=${type}`, {
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
        return null;
    }

    return await request.json();
}