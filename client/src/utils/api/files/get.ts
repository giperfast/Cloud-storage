'use server';
import { cookies } from 'next/headers';
import { IFile } from '@/types/file';
import { IResult, result } from '../result/result';

export const getFiles = async (type: string = 'all', path:string = ''): Promise<Array<IFile>|IResult> => {
    const cookieStore = cookies();
    const session = cookieStore.get('cloud_session')?.value;
    
    if (!session) {
        return result(false, 'Session error, reload page');
    }

    var data = new URLSearchParams();
    data.append('type', type);
    if (path !== '') {
        data.append('path', path);
    }

    const request = await fetch(`http://localhost:4000/files?${data}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`,
        },
        next: { tags: ['files'] },
    }).catch((error) => {
        console.log(error);
    });

    if (request?.status !== 200) {
        return result(false, 'Internal server error');
    }

    return await request.json();
}